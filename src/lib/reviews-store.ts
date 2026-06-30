import { useSyncExternalStore } from "react";
import { ALL_REVIEWS, type Gender, type Review, type ReviewType } from "./reviews-data";

const STORAGE_KEY = "psv_user_reviews_v1";

function loadInitial(): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Review[]) : [];
  } catch {
    return [];
  }
}

let userReviews: Review[] = loadInitial();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userReviews));
  } catch {
    /* ignore quota */
  }
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() {
  return userReviews;
}

function getServerSnapshot(): Review[] {
  return [];
}

export function useUserReviews(): Review[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useAllReviews(): Review[] {
  const u = useUserReviews();
  return [...u, ...ALL_REVIEWS];
}

export interface NewReviewInput {
  name: string;
  rating: number;
  title: string;
  text: string;
  type: ReviewType;
  gender: Gender;
}

export function addReview(input: NewReviewInput): Review {
  const review: Review = {
    id: Date.now(),
    date: new Date().toISOString(),
    ...input,
  };
  userReviews = [review, ...userReviews];
  persist();
  emit();
  return review;
}
