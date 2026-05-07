package com.cybersphere.cybersphere.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class SessionAuth {
  public static Long getUserId(HttpServletRequest req) {
    HttpSession s = req.getSession(false);
    if (s == null) return null;
    Object v = s.getAttribute("userId");
    if (v == null) return null;
    if (v instanceof Long) return (Long) v;
    if (v instanceof Integer) return ((Integer) v).longValue();
    try {
      return Long.parseLong(String.valueOf(v));
    } catch (Exception e) {
      return null;
    }
  }

  public static boolean isAdmin(HttpServletRequest req) {
    HttpSession s = req.getSession(false);
    if (s == null) return false;
    Object v = s.getAttribute("isAdmin");
    return v != null && "true".equalsIgnoreCase(String.valueOf(v));
  }
}

