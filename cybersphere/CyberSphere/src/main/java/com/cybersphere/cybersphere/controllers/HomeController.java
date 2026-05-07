package com.cybersphere.cybersphere.controllers;

import com.cybersphere.cybersphere.repository.PostRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

  private final PostRepository posts;

  public HomeController(PostRepository posts) {
    this.posts = posts;
  }

  @GetMapping("/")
  public String home(Model model) {
    model.addAttribute("featured", posts.featuredPosts(6));
    model.addAttribute("trending", posts.trendingPosts());
    return "index";
  }
}

