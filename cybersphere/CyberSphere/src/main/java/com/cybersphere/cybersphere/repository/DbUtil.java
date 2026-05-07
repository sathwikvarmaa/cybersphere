package com.cybersphere.cybersphere.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;

@Component
public class DbUtil {
  private final DataSource dataSource;

  public DbUtil(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public JdbcTemplate jdbc() {
    return new JdbcTemplate(dataSource);
  }

  public Connection connection() {
    try {
      return DataSourceUtils.getConnection(dataSource);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}

