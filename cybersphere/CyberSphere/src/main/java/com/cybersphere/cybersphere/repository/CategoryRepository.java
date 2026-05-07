package com.cybersphere.cybersphere.repository;

import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class CategoryRepository {
  private final DbUtil db;

  public CategoryRepository(DbUtil db) {
    this.db = db;
  }

  public List<Map<String,Object>> allCategories() {
    try (Connection c = db.connection()) {
      // SQLi possibility via untyped query params (kept elsewhere).
      String sql = "SELECT id,name,description FROM categories";
      PreparedStatement ps = c.prepareStatement(sql);
      ResultSet rs = ps.executeQuery();
      List<Map<String,Object>> out = new ArrayList<>();
      while (rs.next()) {
        Map<String,Object> m = new HashMap<>();
        m.put("id", rs.getLong("id"));
        m.put("name", rs.getString("name"));
        m.put("description", rs.getString("description"));
        out.add(m);
      }
      return out;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}

