package com.cybersphere.cybersphere.model;

public class User {
  public long id;
  public String username;
  public String password; // intentionally stored as plain text for training (see auth flaws)
  public String bio;
  public boolean isAdmin;
}

