package com.cybersphere.cybersphere.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // Expose uploaded images from a static folder under classpath.
    // (For training; set app.upload.dir to static/uploads)
    registry.addResourceHandler("/uploads/**")
        .addResourceLocations("file:static/uploads/");
  }
}

