package com.cybersphere.cybersphere.controllers;

import com.cybersphere.cybersphere.repository.PostRepository;
import com.cybersphere.cybersphere.repository.UserRepository;
import com.cybersphere.cybersphere.security.SessionAuth;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class BlogController {

  private final PostRepository posts;
  private final UserRepository users;

  public BlogController(PostRepository posts, UserRepository users) {
    this.posts = posts;
    this.users = users;
  }

  @GetMapping("/search")
  public String search(@RequestParam(required = false) String q, Model model) {
    if (q == null) {
      model.addAttribute("q", null);
      model.addAttribute("posts", java.util.Collections.emptyList());
      return "search";
    }
    model.addAttribute("q", q);
    model.addAttribute("posts", posts.searchPosts(q, 12));
    return "search";
  }

  @GetMapping("/categories")
  public String categories(Model model) {
    // minimal placeholder; later will use real repo for IDOR/SQLi
    java.util.List<java.util.Map<String,Object>> categories = new java.util.ArrayList<>();
    categories.add(java.util.Map.of("id", 1L, "name", "Security", "description", "Practical security topics."));
    categories.add(java.util.Map.of("id", 2L, "name", "Engineering", "description", "Software engineering stories."));
    categories.add(java.util.Map.of("id", 3L, "name", "Community", "description", "Events, reviews, and updates."));
    model.addAttribute("categories", categories);
    return "categories";
  }

  @GetMapping("/post/{id}")
  public String post(@PathVariable long id, Model model) {
    java.util.Map<String,Object> post = posts.postById(id);
    if (post == null) return "redirect:/";

    // Thymeleaf template expects keys: post.title, post.imagePath, post.authorUsername, etc.
    model.addAttribute("post", post);
    model.addAttribute("comments", posts.commentsForPost(id));
    return "post";
  }

  @PostMapping("/post/comments")
  public String addComment(@RequestParam long postId, @RequestParam(required = false) Long parentId, @RequestParam String body, HttpServletRequest req) {
    // CSRF flaw: no token checks.
    Long userId = SessionAuth.getUserId(req);
    if (userId == null) return "redirect:/login";
    posts.addComment(postId, parentId, userId, body);
    return "redirect:/post/" + postId;
  }

  @PostMapping("/reaction/like")
  public String like(@RequestParam long postId, HttpServletRequest req) {
    // CSRF flaw: state change via POST without CSRF.
    Long userId = SessionAuth.getUserId(req);
    if (userId == null) return "redirect:/login";
    posts.likePost(postId, userId);
    return "redirect:/post/" + postId;
  }

  @PostMapping("/bookmark/add")
  public String bookmark(@RequestParam long postId, HttpServletRequest req) {
    // CSRF flaw: state change via POST without CSRF.
    Long userId = SessionAuth.getUserId(req);
    if (userId == null) return "redirect:/login";
    posts.addBookmark(postId, userId);
    return "redirect:/post/" + postId;
  }
}

