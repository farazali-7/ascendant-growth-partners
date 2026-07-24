/**
 * Shared landmark identifiers.
 *
 * The skip link and the <main> element must agree on this value. Kept in one
 * constant because a mismatch produces a skip link that silently does nothing
 * — it throws no error and is invisible to anyone not testing with a keyboard.
 */
export const MAIN_CONTENT_ID = "main-content";
