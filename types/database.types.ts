// Types générés depuis Supabase
// Pour générer automatiquement: npm run types:generate

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'user' | 'moderator' | 'admin'
export type ReportStatus = 'pending' | 'reviewed' | 'resolved' | 'dismissed'
export type ReportType = 'post' | 'thread' | 'profile'
export type ReactionType = 'like' | 'helpful' | 'insightful' | 'funny'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          role: UserRole
          is_banned: boolean
          ban_reason: string | null
          banned_until: string | null
          is_premium: boolean
          premium_since: string | null
          premium_until: string | null
          stripe_customer_id: string | null
          posts_count: number
          threads_count: number
          reputation: number
          email_notifications: boolean
          timezone: string
          created_at: string
          updated_at: string
          last_seen_at: string | null
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: UserRole
          is_banned?: boolean
          ban_reason?: string | null
          banned_until?: string | null
          is_premium?: boolean
          premium_since?: string | null
          premium_until?: string | null
          stripe_customer_id?: string | null
          posts_count?: number
          threads_count?: number
          reputation?: number
          email_notifications?: boolean
          timezone?: string
          created_at?: string
          updated_at?: string
          last_seen_at?: string | null
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: UserRole
          is_banned?: boolean
          ban_reason?: string | null
          banned_until?: string | null
          is_premium?: boolean
          premium_since?: string | null
          premium_until?: string | null
          stripe_customer_id?: string | null
          posts_count?: number
          threads_count?: number
          reputation?: number
          email_notifications?: boolean
          timezone?: string
          created_at?: string
          updated_at?: string
          last_seen_at?: string | null
        }
      }
      hunts: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          icon: string | null
          color: string
          cover_image_url: string | null
          is_active: boolean
          is_featured: boolean
          difficulty: 'easy' | 'medium' | 'hard' | 'expert' | null
          start_date: string | null
          end_date: string | null
          prize_description: string | null
          external_url: string | null
          enigmas_count: number
          threads_count: number
          posts_count: number
          followers_count: number
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          icon?: string | null
          color?: string
          cover_image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          difficulty?: 'easy' | 'medium' | 'hard' | 'expert' | null
          start_date?: string | null
          end_date?: string | null
          prize_description?: string | null
          external_url?: string | null
          enigmas_count?: number
          threads_count?: number
          posts_count?: number
          followers_count?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          icon?: string | null
          color?: string
          cover_image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          difficulty?: 'easy' | 'medium' | 'hard' | 'expert' | null
          start_date?: string | null
          end_date?: string | null
          prize_description?: string | null
          external_url?: string | null
          enigmas_count?: number
          threads_count?: number
          posts_count?: number
          followers_count?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      enigmas: {
        Row: {
          id: string
          hunt_id: string
          slug: string
          number: string
          title: string
          description: string | null
          content: string | null
          image_url: string | null
          solution_hint: string | null
          order_index: number
          parent_enigma_id: string | null
          is_active: boolean
          is_solved: boolean
          solved_at: string | null
          solved_by: string | null
          threads_count: number
          posts_count: number
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          hunt_id: string
          slug: string
          number: string
          title: string
          description?: string | null
          content?: string | null
          image_url?: string | null
          solution_hint?: string | null
          order_index: number
          parent_enigma_id?: string | null
          is_active?: boolean
          is_solved?: boolean
          solved_at?: string | null
          solved_by?: string | null
          threads_count?: number
          posts_count?: number
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          hunt_id?: string
          slug?: string
          number?: string
          title?: string
          description?: string | null
          content?: string | null
          image_url?: string | null
          solution_hint?: string | null
          order_index?: number
          parent_enigma_id?: string | null
          is_active?: boolean
          is_solved?: boolean
          solved_at?: string | null
          solved_by?: string | null
          threads_count?: number
          posts_count?: number
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      threads: {
        Row: {
          id: string
          enigma_id: string
          author_id: string
          title: string
          slug: string
          is_pinned: boolean
          is_locked: boolean
          is_deleted: boolean
          locked_reason: string | null
          deleted_reason: string | null
          views: number
          posts_count: number
          reactions_count: number
          last_post_at: string
          last_post_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          enigma_id: string
          author_id: string
          title: string
          slug: string
          is_pinned?: boolean
          is_locked?: boolean
          is_deleted?: boolean
          locked_reason?: string | null
          deleted_reason?: string | null
          views?: number
          posts_count?: number
          reactions_count?: number
          last_post_at?: string
          last_post_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          enigma_id?: string
          author_id?: string
          title?: string
          slug?: string
          is_pinned?: boolean
          is_locked?: boolean
          is_deleted?: boolean
          locked_reason?: string | null
          deleted_reason?: string | null
          views?: number
          posts_count?: number
          reactions_count?: number
          last_post_at?: string
          last_post_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          thread_id: string
          author_id: string
          parent_post_id: string | null
          content: string
          content_html: string | null
          post_position: number
          is_deleted: boolean
          deleted_reason: string | null
          is_edited: boolean
          edited_at: string | null
          edit_reason: string | null
          reactions_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          thread_id: string
          author_id: string
          parent_post_id?: string | null
          content: string
          content_html?: string | null
          post_position?: number
          is_deleted?: boolean
          deleted_reason?: string | null
          is_edited?: boolean
          edited_at?: string | null
          edit_reason?: string | null
          reactions_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          thread_id?: string
          author_id?: string
          parent_post_id?: string | null
          content?: string
          content_html?: string | null
          post_position?: number
          is_deleted?: boolean
          deleted_reason?: string | null
          is_edited?: boolean
          edited_at?: string | null
          edit_reason?: string | null
          reactions_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      post_reactions: {
        Row: {
          user_id: string
          post_id: string
          reaction: ReactionType
          created_at: string
        }
        Insert: {
          user_id: string
          post_id: string
          reaction: ReactionType
          created_at?: string
        }
        Update: {
          user_id?: string
          post_id?: string
          reaction?: ReactionType
          created_at?: string
        }
      }
      thread_subscriptions: {
        Row: {
          user_id: string
          thread_id: string
          subscribed_at: string
          last_read_at: string | null
          last_read_position: number
          notify_new_posts: boolean
          notify_mentions: boolean
        }
        Insert: {
          user_id: string
          thread_id: string
          subscribed_at?: string
          last_read_at?: string | null
          last_read_position?: number
          notify_new_posts?: boolean
          notify_mentions?: boolean
        }
        Update: {
          user_id?: string
          thread_id?: string
          subscribed_at?: string
          last_read_at?: string | null
          last_read_position?: number
          notify_new_posts?: boolean
          notify_mentions?: boolean
        }
      }
      reports: {
        Row: {
          id: string
          reported_type: ReportType
          reported_id: string
          reporter_id: string
          reason: string
          details: string | null
          status: ReportStatus
          reviewed_by: string | null
          reviewed_at: string | null
          review_notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          reported_type: ReportType
          reported_id: string
          reporter_id: string
          reason: string
          details?: string | null
          status?: ReportStatus
          reviewed_by?: string | null
          reviewed_at?: string | null
          review_notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          reported_type?: ReportType
          reported_id?: string
          reporter_id?: string
          reason?: string
          details?: string | null
          status?: ReportStatus
          reviewed_by?: string | null
          reviewed_at?: string | null
          review_notes?: string | null
          created_at?: string
        }
      }
    }
    Functions: {
      get_threads_paginated: {
        Args: {
          p_enigma_id: string
          p_limit?: number
          p_cursor?: string
        }
        Returns: Array<{
          id: string
          title: string
          slug: string
          author_id: string
          author_username: string
          author_avatar_url: string | null
          posts_count: number
          views: number
          is_pinned: boolean
          is_locked: boolean
          last_post_at: string
          last_post_by_username: string | null
          created_at: string
        }>
      }
      get_posts_paginated: {
        Args: {
          p_thread_id: string
          p_page?: number
          p_limit?: number
        }
        Returns: Array<{
          id: string
          content: string
          content_html: string | null
          author_id: string
          author_username: string
          author_avatar_url: string | null
          author_role: UserRole
          author_posts_count: number
          post_position: number
          is_edited: boolean
          edited_at: string | null
          reactions_count: number
          created_at: string
        }>
      }
    }
  }
}
