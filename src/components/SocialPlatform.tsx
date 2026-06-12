/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActivityFeedPost } from '../types';
import { Heart, MessageCircle, Send, Plus, Award, User, Flame } from 'lucide-react';

interface SocialPlatformProps {
  feed: ActivityFeedPost[];
  onToggleLike: (postId: string) => Promise<any>;
  onAddComment: (postId: string, commentText: string) => Promise<any>;
  onRefreshFeed: () => void;
}

export default function SocialPlatform({ feed, onToggleLike, onAddComment, onRefreshFeed }: SocialPlatformProps) {
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<string | null>(null);

  const handleLikeClick = async (postId: string) => {
    setLoading(postId);
    try {
      await onToggleLike(postId);
      onRefreshFeed();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  const handleCommentSubmit = async (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const txt = commentInputs[postId];
    if (!txt) return;

    setLoading(postId);
    try {
      await onAddComment(postId, txt);
      setCommentInputs({ ...commentInputs, [postId]: "" });
      onRefreshFeed();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6" id="social-activities-feed-tab">
      <div className="flex justify-between items-center pb-2">
        <div>
          <h3 className="font-display text-xl font-bold text-white">Apex Athlete Feed</h3>
          <p className="text-xs text-zinc-400">Interact with verified athlete activities on the leaderboard</p>
        </div>
      </div>

      <div className="space-y-6">
        {feed.length > 0 ? (
          feed.map(post => {
            return (
              <div key={post.id} className="glass-panel p-5 rounded-2xl space-y-4">
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-orange bg-zinc-800 overflow-hidden">
                      <img src={post.userAvatar} alt={post.userName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{post.userName}</h4>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        {new Date(post.date).toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  {/* Badge */}
                  <span className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-full ${
                    post.type === 'run' ? 'bg-orange/10 text-orange border border-orange/15' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/15'
                  }`}>
                    {post.type}
                  </span>
                </div>

                {/* Subtext info */}
                <div className="space-y-1">
                  <h5 className="text-sm font-semibold text-white leading-snug">{post.title}</h5>
                  <p className="text-xs text-zinc-400">{post.subtitle}</p>
                </div>

                {/* Workout summary highlights */}
                {post.type === 'workout' && post.details && (
                  <div className="grid grid-cols-3 gap-2 bg-zinc-950 p-3 rounded-xl border border-white/5 text-center">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Exercises</span>
                      <span className="text-xs font-bold text-white font-mono">{post.details.exercisesCount} moves</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Duration</span>
                      <span className="text-xs font-bold text-white font-mono">{post.details.duration} mins</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Calories</span>
                      <span className="text-xs font-bold text-white font-mono">{post.details.calories} kcal</span>
                    </div>
                  </div>
                )}

                {/* Run summary highlights */}
                {post.type === 'run' && post.details && (
                  <div className="grid grid-cols-3 gap-2 bg-zinc-950 p-3 rounded-xl border border-white/5 text-center">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Distance</span>
                      <span className="text-xs font-bold text-white font-mono">{post.details.distance} KM</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Duration</span>
                      <span className="text-xs font-bold text-white font-mono">{Math.round(post.details.duration / 60)} mins</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Calories</span>
                      <span className="text-xs font-bold text-white font-mono">{post.details.calories} kcal</span>
                    </div>
                  </div>
                )}

                {/* Like / Comment Interaction row */}
                <div className="flex items-center gap-6 border-t border-b border-zinc-900 py-2.5">
                  <button
                    onClick={() => handleLikeClick(post.id)}
                    disabled={loading === post.id}
                    className={`flex items-center gap-1.5 text-xs font-bold uppercase transition-all cursor-pointer ${
                      post.isLikedByCurrentUser ? 'text-orange' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLikedByCurrentUser ? 'fill-orange' : ''}`} />
                    {post.likesCount} Kudos
                  </button>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 uppercase">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments ? post.comments.length : 0} Remarks
                  </span>
                </div>

                {/* Comments Listing */}
                <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                  {post.comments && post.comments.length > 0 && (
                    post.comments.map(comm => (
                      <div key={comm.id} className="p-2.5 bg-zinc-900/60 rounded-xl text-xs flex flex-col gap-0.5 border border-white/5">
                        <strong className="text-white uppercase text-[10px]">{comm.userName}</strong>
                        <p className="text-zinc-300">{comm.text}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment composer box */}
                <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Provide supportive feedback to athlete..."
                    value={commentInputs[post.id] || ""}
                    onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    className="flex-1 bg-zinc-900 border border-zinc-850 px-3.5 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-orange"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange text-white rounded-xl flex items-center justify-center cursor-pointer hover:bg-orange/90"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

              </div>
            );
          })
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-zinc-900 rounded-3xl p-6">
            <User className="w-10 h-10 text-zinc-650 mx-auto mb-3" />
            <h4 className="font-display text-lg font-bold text-white mb-1">Activity ticker is currently empty</h4>
          </div>
        )}
      </div>
    </div>
  );
}
