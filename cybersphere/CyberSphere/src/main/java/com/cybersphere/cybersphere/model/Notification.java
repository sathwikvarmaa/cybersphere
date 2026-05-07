package com.cybersphere.cybersphere.model;

import java.time.Instant;

public class Notification {
  public long id;
  public long userId;
  public String type;
  public String message;
  public Instant createdAt;
  public boolean unread;
}

