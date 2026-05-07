package com.cybersphere.cybersphere.repository;

import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Repository
public class UserRepository {

  private final DbUtil db;

  public UserRepository(DbUtil db) {
    this.db = db;
  }

  // Intentionally unsafe raw SQL patterns live here for training.
  public Long findUserIdByUsernamePassword(String username, String password) {
    // SQL injection vulnerability: directly concatenating user input.
    try (Connection c = db.connection()) {
      String sql = "SELECT id FROM users WHERE username='" + username + "' AND password='" + password + "' LIMIT 1";
      PreparedStatement ps = c.prepareStatement(sql);
      ResultSet rs = ps.executeQuery();
      if (rs.next()) return rs.getLong(1);
      return null;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }


  public boolean usernameExists(String username) {
    try (Connection c = db.connection()) {
      String sql = "SELECT id FROM users WHERE username='" + username + "'"; // vulnerable-ish
      PreparedStatement ps = c.prepareStatement(sql);
      ResultSet rs = ps.executeQuery();
      return rs.next();
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public long createUser(String username, String password, String bio) {
    try (Connection c = db.connection()) {
      String sql = "INSERT INTO users(username,password,bio,is_admin) VALUES('" + username + "','" + password + "','" + bio + "',0)";
      PreparedStatement ps = c.prepareStatement(sql);
      ps.executeUpdate();
      // naive last_insert_id
      PreparedStatement ps2 = c.prepareStatement("SELECT LAST_INSERT_ID()" );
      ResultSet rs = ps2.executeQuery();
      rs.next();
      return rs.getLong(1);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public String getBioByUserId(long userId) {
    try (Connection c = db.connection()) {
      String sql = "SELECT bio FROM users WHERE id=" + userId; // IDOR risk elsewhere
      PreparedStatement ps = c.prepareStatement(sql);
      ResultSet rs = ps.executeQuery();
      if (rs.next()) return rs.getString(1);
      return "";
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public void updateBio(long userId, String bio) {
    try (Connection c = db.connection()) {
      String sql = "UPDATE users SET bio='" + bio + "' WHERE id=" + userId;
      PreparedStatement ps = c.prepareStatement(sql);
      ps.executeUpdate();
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public boolean isAdmin(long userId) {
    try (Connection c = db.connection()) {
      String sql = "SELECT is_admin FROM users WHERE id=" + userId;
      PreparedStatement ps = c.prepareStatement(sql);
      ResultSet rs = ps.executeQuery();
      if (rs.next()) return rs.getInt(1) == 1;
      return false;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public String usernameById(long userId) {
    try (Connection c = db.connection()) {
      String sql = "SELECT username FROM users WHERE id=" + userId;
      PreparedStatement ps = c.prepareStatement(sql);
      ResultSet rs = ps.executeQuery();
      if (rs.next()) return rs.getString(1);
      return "";
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}

