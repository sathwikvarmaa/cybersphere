package com.cybersphere.cybersphere.repository;

import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.Instant;

@Repository
public class PostRepository {

  private final DbUtil db;

  public PostRepository(DbUtil db) {
    this.db = db;
  }

  public ResultSet fetchFeaturedPosts() {
    throw new UnsupportedOperationException("Use typed methods");
  }

  public java.util.List<java.util.Map<String,Object>> featuredPosts(int limit) {
    try (Connection c = db.connection()) {
      String sql = "SELECT p.id, p.title, p.content, p.image_path, p.author_id, u.username AS author_username, p.created_at, p.featured FROM posts p JOIN users u ON u.id=p.author_id WHERE p.featured=1 ORDER BY p.created_at DESC LIMIT " + limit;
      PreparedStatement ps = c.prepareStatement(sql);
      ResultSet rs = ps.executeQuery();

      java.util.ArrayList<java.util.Map<String,Object>> out = new java.util.ArrayList<>();
      while (rs.next()) {
        java.util.HashMap<String,Object> m = new java.util.HashMap<>();
        m.put("id", rs.getLong("id"));
        m.put("title", rs.getString("title"));
        m.put("image_path", rs.getString("image_path"));
        m.put("author_username", rs.getString("author_username"));
        m.put("created_at", rs.getTimestamp("created_at").toInstant());
        out.add(m);
      }
      return out;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public java.util.Map<String,Object> postById(long postId) {
    try (Connection c = db.connection()) {
      // SQLi risk: concatenate
      String sql = "SELECT p.*, u.username AS author_username FROM posts p JOIN users u ON u.id=p.author_id WHERE p.id=" + postId;
      PreparedStatement ps = c.prepareStatement(sql);
      ResultSet rs = ps.executeQuery();
      if (!rs.next()) return null;
      java.util.HashMap<String,Object> m = new java.util.HashMap<>();
      m.put("id", rs.getLong("id"));
      m.put("title", rs.getString("title"));
      m.put("content", rs.getString("content"));
      m.put("imagePath", rs.getString("image_path"));
      m.put("authorId", rs.getLong("author_id"));
      m.put("authorUsername", rs.getString("author_username"));
      m.put("categoryId", rs.getLong("category_id"));
      m.put("subcategory", rs.getString("subcategory"));
      m.put("featured", rs.getInt("featured") == 1);
      m.put("createdAt", rs.getTimestamp("created_at").toInstant().toString());
      return m;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public java.util.List<java.util.Map<String,Object>> commentsForPost(long postId) {
    try (Connection c = db.connection()) {
      String sql = "SELECT c.*, u.username AS author_username FROM comments c JOIN users u ON u.id=c.author_id WHERE c.post_id=" + postId + " ORDER BY c.created_at DESC";
      PreparedStatement ps = c.prepareStatement(sql);
      ResultSet rs = ps.executeQuery();
      java.util.ArrayList<java.util.Map<String,Object>> out = new java.util.ArrayList<>();
      while (rs.next()) {
        java.util.HashMap<String,Object> m = new java.util.HashMap<>();
        m.put("id", rs.getLong("id"));
        m.put("body", rs.getString("body"));
        m.put("authorUsername", rs.getString("author_username"));
        m.put("parentId", rs.getObject("parent_id") == null ? null : rs.getLong("parent_id"));
        out.add(m);
      }
      return out;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public void addComment(long postId, Long parentId, long authorId, String body) {
    try (Connection c = db.connection()) {
      String sql = "INSERT INTO comments(post_id,parent_id,author_id,body) VALUES(" + postId + "," + (parentId == null ? "NULL" : parentId) + "," + authorId + ",'" + body + "')";
      PreparedStatement ps = c.prepareStatement(sql);
      ps.executeUpdate();
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public void likePost(long postId, long userId) {
    try (Connection c = db.connection()) {
      // Vulnerable: no kind validation; also direct SQL
      String sql = "INSERT INTO reactions(post_id,user_id,kind) VALUES(" + postId + "," + userId + ",'like')";
      PreparedStatement ps = c.prepareStatement(sql);
      ps.executeUpdate();
    } catch (Exception e) {
      // ignore duplicates
    }
  }

  public void addBookmark(long postId, long userId) {
    try (Connection c = db.connection()) {
      String sql = "INSERT INTO bookmarks(post_id,user_id) VALUES(" + postId + "," + userId + ")";
      PreparedStatement ps = c.prepareStatement(sql);
      ps.executeUpdate();
    } catch (Exception e) {
      // ignore duplicates
    }
  }

  public java.util.List<java.util.Map<String,Object>> searchPosts(String q, int limit) {
    try (Connection c = db.connection()) {
      // blind/sql injection friendly: concatenate query
      String sql = "SELECT p.id,p.title,p.image_path,p.created_at,u.username AS author_username FROM posts p JOIN users u ON u.id=p.author_id WHERE p.title LIKE '%" + q + "%' OR p.content LIKE '%" + q + "%' OR u.username LIKE '%" + q + "%' LIMIT " + limit;
      PreparedStatement ps = c.prepareStatement(sql);
      ResultSet rs = ps.executeQuery();
      java.util.ArrayList<java.util.Map<String,Object>> out = new java.util.ArrayList<>();
      while (rs.next()) {
        java.util.HashMap<String,Object> m = new java.util.HashMap<>();
        m.put("id", rs.getLong("id"));
        m.put("title", rs.getString("title"));
        m.put("image_path", rs.getString("image_path"));
        m.put("createdAt", rs.getTimestamp("created_at").toInstant().toString());
        out.add(m);
      }
      return out;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public java.util.List<java.util.Map<String,Object>> trendingPosts() {
    try (Connection c = db.connection()) {
      // naive trending based on reactions/bookmarks counts
      String sql = "SELECT p.id,p.title,p.image_path,MAX(p.created_at) as created_at FROM posts p LEFT JOIN reactions r ON r.post_id=p.id LEFT JOIN bookmarks b ON b.post_id=p.id GROUP BY p.id ORDER BY COUNT(r.id)+COUNT(b.id) DESC LIMIT 6";
      PreparedStatement ps = c.prepareStatement(sql);
      ResultSet rs = ps.executeQuery();
      java.util.ArrayList<java.util.Map<String,Object>> out = new java.util.ArrayList<>();
      while (rs.next()) {
        java.util.HashMap<String,Object> m = new java.util.HashMap<>();
        m.put("id", rs.getLong("id"));
        m.put("title", rs.getString("title"));
        m.put("image_path", rs.getString("image_path"));
        m.put("createdAt", rs.getTimestamp("created_at").toInstant().toString());
        out.add(m);
      }
      return out;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}

