package com.cybersphere.cybersphere.controllers;

import com.cybersphere.cybersphere.repository.UserRepository;
import com.cybersphere.cybersphere.security.SessionAuth;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class AuthController {

  private final UserRepository users;

  public AuthController(UserRepository users) {
    this.users = users;
  }

  @GetMapping("/login")
  public String login() {
    return "login";
  }

  @PostMapping("/login")
  public String doLogin(@RequestParam String username, @RequestParam String password, HttpServletRequest req) {
    // Auth flaw: no brute force protection; unsafe SQL in repository.
    Long userId = users.findUserIdByUsernamePassword(username, password);
    if (userId != null) {
      HttpSession s = req.getSession(true);
      s.setAttribute("userId", userId);
      s.setAttribute("isAdmin", users.isAdmin(userId));
      // Insecure cookie flags set by container defaults.
      return "redirect:/";
    }
    return "redirect:/login";
  }

  @GetMapping("/logout")
  public String logout(HttpServletRequest req) {
    HttpSession s = req.getSession(false);
    if (s != null) s.invalidate();
    return "redirect:/";
  }

  @GetMapping("/register")
  public String register() {
    return "register";
  }

  @PostMapping("/register")
  public String doRegister(@RequestParam String username, @RequestParam String password, @RequestParam(required = false) String bio) {
    if (bio == null) bio = "";
    if (users.usernameExists(username)) return "redirect:/register";
    users.createUser(username, password, bio);
    return "redirect:/login";
  }

  @PostMapping("/profile/update")
  public String updateProfile(@RequestParam String bio, HttpServletRequest req) {
    // CSRF flaw: no CSRF validation and state-changing POST without checks.
    Long userId = SessionAuth.getUserId(req);
    if (userId == null) return "redirect:/login";
    users.updateBio(userId, bio);
    return "redirect:/profile";
  }

  @GetMapping("/profile")
  public String profile(HttpServletRequest req, org.springframework.ui.Model model) {
    Long userId = SessionAuth.getUserId(req);
    if (userId == null) return "redirect:/login";

    model.addAttribute("username", users.usernameById(userId));
    model.addAttribute("bio", users.getBioByUserId(userId));
    model.addAttribute("isAdmin", users.isAdmin(userId));
    return "profile";
  }
}

