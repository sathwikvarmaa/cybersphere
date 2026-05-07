package com.cybersphere.cybersphere.model;

import java.time.Instant;

public class Comment {
  public long id;
  public long postId;
  public long parentId; // for nested replies
  public long authorId;
  public String body;
  public Instant createdAt;
}

