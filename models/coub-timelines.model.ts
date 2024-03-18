// Generated by https://quicktype.io

export interface CoubTimelineModel {
    page:        number;
    per_page:    number;
    total_pages: number;
    coubs:       CoubModel[];
}

export interface CoubModel {
    flag:                      boolean;
    abuses:                    null;
    recoubs_by_users_channels: any[];
    favourite:                 boolean;
    pinned:                    boolean;
    promoted_id:               null;
    recoub:                    boolean;
    like:                      boolean;
    dislike:                   boolean;
    reaction:                  Reaction;
    in_my_best2015:            boolean;
    id:                        number;
    type:                      CoubType;
    permalink:                 string;
    title:                     string;
    visibility_type:           VisibilityType;
    original_visibility_type:  VisibilityType;
    channel_id:                number;
    created_at:                string;
    updated_at:                string;
    is_done:                   boolean;
    views_count:               number;
    cotd:                      boolean | null;
    cotd_at:                   null | string;
    visible_on_explore_root:   boolean;
    visible_on_explore:        boolean;
    featured:                  boolean;
    published:                 boolean;
    published_at:              string;
    reversed:                  boolean;
    moderation_state:          ModerationState;
    editing_locked:            boolean;
    is_nft:                    null;
    from_editor_v2:            boolean;
    is_editable:               boolean;
    original_sound:            boolean;
    has_sound:                 boolean;
    recoub_to:                 null;
    file_versions:             FileVersions;
    audio_versions:            Versions;
    image_versions:            Versions;
    first_frame_versions:      Versions;
    dimensions:                Dimensions;
    site_w_h:                  number[];
    page_w_h:                  number[];
    site_w_h_small:            number[];
    size:                      number[];
    age_restricted:            boolean;
    age_restricted_by_admin:   boolean;
    not_safe_for_work:         boolean | null;
    allow_reuse:               boolean;
    dont_crop:                 boolean;
    banned:                    boolean;
    global_safe:               boolean | null;
    audio_file_url:            null | string;
    external_download:         boolean | ExternalDownloadClass;
    application:               null;
    channel:                   Channel;
    file:                      null;
    picture:                   string;
    timeline_picture:          string;
    small_picture:             string;
    sharing_picture:           null;
    percent_done:              number;
    tags:                      Tag[];
    categories:                Category[];
    communities:               Community[];
    music:                     Music | null;
    celebrities:               string[];
    recoubs_count:             number;
    remixes_count:             number;
    likes_count:               number;
    dislikes_count:            number;
    comments_count:            number;
    translated_title:          null | string;
    raw_video_id:              number | string;
    uploaded_by_ios_app:       boolean;
    uploaded_by_android_app:   boolean;
    media_blocks:              MediaBlocks;
    raw_video_thumbnail_url:   string;
    raw_video_title:           null | string;
    video_block_banned:        boolean;
    duration:                  number;
    promo_winner:              boolean;
    promo_winner_recoubers:    Array<Array<number | string>> | null;
    editorial_info:            EditorialInfo;
    promo_hint:                null;
    beeline_best_2014:         null;
    from_web_editor:           boolean;
    normalize_sound:           boolean;
    normalize_change_allowed:  boolean;
    best2015_addable:          boolean;
    ahmad_promo:               null;
    promo_data:                null;
    audio_copyright_claim:     null;
    ads_disabled:              boolean | null;
    is_safe_for_ads:           boolean;
    position_on_page:          number;
}

export interface Versions {
    template?: string;
    versions?: Version[];
}

export enum Version {
    AgeRestricted = "age_restricted",
    Big = "big",
    IosLarge = "ios_large",
    IosMosaic = "ios_mosaic",
    IosSmall = "ios_small",
    Low = "low",
    Med = "med",
    Medium = "medium",
    Medium2X = "medium_2x",
    Micro = "micro",
    Mid = "mid",
    Pinterest = "pinterest",
    ProfilePic = "profile_pic",
    ProfilePicNew = "profile_pic_new",
    ProfilePicNew2X = "profile_pic_new_2x",
    Small = "small",
    Small2X = "small_2x",
    Tiny = "tiny",
    Tiny2X = "tiny_2x",
}

export interface Category {
    id:                  number;
    title:               string;
    permalink:           string;
    subscriptions_count: number;
    big_image_url:       string;
    small_image_url:     string;
    med_image_url:       string;
    visible:             boolean;
}

export interface Channel {
    id:                        number;
    permalink:                 string;
    title:                     string;
    description:               null | string;
    i_follow_him:              boolean;
    follows_by_users_channels: number[];
    followers_count:           number;
    following_count:           number;
    avatar_versions:           Versions;
    views_count:               number;
}

export interface Community {
    id:                              number;
    title:                           string;
    permalink:                       string;
    subscriptions_count:             number;
    big_image_url:                   string;
    small_image_url:                 string;
    med_image_url:                   string;
    i_subscribed:                    boolean;
    community_notifications_enabled: boolean;
    description:                     Description;
}

export interface Description {
    id:               number;
    description:      string;
    rules:            string[];
    description_html: string;
    rules_html:       string[];
}

export interface Dimensions {
    big: number[];
    med: number[];
}

export interface EditorialInfo {
}

export interface ExternalDownloadClass {
    type:         ServiceEnum;
    service_name: string;
    url:          string;
    has_embed:    boolean;
}

export enum ServiceEnum {
    Youtube = "Youtube",
}

export interface FileVersions {
    html5:  Html5;
    mobile: Mobile;
    share:  Share;
}

export interface Html5 {
    video: Video;
    audio: Audio;
}

export interface Audio {
    high:             High;
    med:              High;
    sample_duration?: number;
}

export interface High {
    url:  string;
    size: number;
}

export interface Video {
    high: High;
    med:  High;
}

export interface Mobile {
    video: string;
    audio: string[];
}

export interface Share {
    default: null | string;
}

export interface MediaBlocks {
    uploaded_raw_videos: any[];
    external_raw_videos: ExternalVideo[];
    remixed_from_coubs:  RemixedFromCoub[];
    external_video?:     ExternalVideo;
}

export interface ExternalVideo {
    id:           number;
    title:        string;
    url:          string;
    image:        string;
    image_retina: string;
    meta:         ExternalVideoMeta;
    duration:     number;
    raw_video_id: number;
    has_embed:    boolean;
}

export interface ExternalVideoMeta {
    service:  ServiceEnum;
    duration: string;
}

export interface RemixedFromCoub {
    id:                     number;
    title:                  string;
    url:                    string;
    image:                  string;
    image_retina:           string;
    meta:                   RemixedFromCoubMeta;
    duration:               null;
    coub_channel_title:     string;
    coub_channel_permalink: string;
    coub_views_count:       number;
    coub_likes_count:       number;
    coub_permalink:         string;
}

export interface RemixedFromCoubMeta {
    duration: string;
}

export enum ModerationState {
    Initial = "initial",
}

export interface Music {
    id:           number;
    title:        string;
    image_url:    null | string;
    album_name:   string;
    genres:       string[];
    artist_title: string;
    artist_id:    number;
}

export enum VisibilityType {
    Public = "public",
}

export enum Reaction {
    Heart = "heart",
}

export interface Tag {
    id:    number;
    title: string;
    value: string;
}

export enum CoubType {
    CoubSimple = "Coub::Simple",
}