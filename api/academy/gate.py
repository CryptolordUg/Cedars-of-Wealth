def can_access_signals(user_id, db):
  q = "SELECT 1 FROM course_completions WHERE user_id=%s AND course IN ('Risk 101','Forex basics')"
  return db.execute(q, [user_id]).rowcount >= 2
