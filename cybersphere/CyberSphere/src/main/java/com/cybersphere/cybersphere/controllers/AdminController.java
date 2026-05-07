package com.cybersphere.cybersphere.controllers;

import com.cybersphere.cybersphere.security.SessionAuth;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

  @GetMapping("/admin")
  public String admin(HttpServletRequest req, Model model) {
    // Auth flaw placeholder: missing/weak authorization checks.
    boolean isAdmin = SessionAuth.isAdmin(req);
    model.addAttribute("isAdmin", isAdmin);
    return "admin";
  }
}

