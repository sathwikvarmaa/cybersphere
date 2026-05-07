package com.cybersphere.cybersphere.model;

import java.time.Instant;

public class Post {
  public long id;
  public String title;
  public String content;
  public String imagePath;
  public long authorId;
  public long categoryId;
  public String subcategory;
  public boolean featured;
  public Instant createdAt;
}

