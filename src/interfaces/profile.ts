import type { StudyState } from "./studyState";

export interface ProfileUpdate {
  name?: string;
  profile_img?: string;
}

export interface Profile extends ProfileUpdate {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface OnboardingCreate {
  profile: ProfileUpdate;
  daily_time_goal: number;
}

export interface OnboardingRes {
  profile: Profile;
  study_state: StudyState
}
