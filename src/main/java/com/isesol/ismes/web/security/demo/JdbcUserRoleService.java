package com.isesol.ismes.web.security.demo;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.isesol.ismes.platform.web.initializer.ApplicationContextProvider;

@Deprecated
@Service
public class JdbcUserRoleService implements Serializable {

	private static final long serialVersionUID = 1L;

	private final static String GET_USER = "select user_id, password, enabled from users where user_id = '%s'";
	private final static String ADD_USER = "insert into users values ('%s', '%s', %d)";
	private final static String DISABLE_USER = "update users set enabled = 0 where user_id = '%s'";
	private final static String ENABLE_USER = "update users set enabled = 1 where user_id = '%s'";
//	private final static String DELETE_USER_ROLES = "delete from mapping_user_roles where role in (%s) and user_id = '%s'";
//	private final static String DELETE_USER_ALL_ROLES = "delete from user_roles where user_id = '%s'";
	private final static String GET_ENABLED_USER_ROLES = "select users.user_id, role.name as role from users join mapping_user_role using(user_id) join role using(role_id) where users.user_id in (%s) and users.enabled = 1 order by users.user_id";
	
	public Map<String, Object> getUser(String user_id) {
		JdbcTemplate template = ApplicationContextProvider.get().getBean("dbTemplate", JdbcTemplate.class);
		String sql = String.format(GET_USER, user_id);
		List<Map<String, Object>> rows = template.queryForList(sql);
		if (rows.isEmpty()) {
			return new HashMap<String, Object>();
		}
		return rows.get(0);
	}
	
	public void addUser(String user_id, String password, boolean enabled) {
		JdbcTemplate template = ApplicationContextProvider.get().getBean("dbTemplate", JdbcTemplate.class);
		BCryptPasswordEncoder passwordEncoder = ApplicationContextProvider.get().getBean(BCryptPasswordEncoder.class);
		String sql = String.format(ADD_USER, user_id, passwordEncoder.encode(password), enabled ? 1 : 0);
		template.execute(sql);
	}

	public void enableUser(String user_id) {
		JdbcTemplate template = ApplicationContextProvider.get().getBean("dbTemplate", JdbcTemplate.class);
		String sql = String.format(ENABLE_USER, user_id);
		template.execute(sql);
	}

	public void disableUser(String user_id) {
		JdbcTemplate template = ApplicationContextProvider.get().getBean("dbTemplate", JdbcTemplate.class);
		String sql = String.format(DISABLE_USER, user_id);
		template.execute(sql);
	}

	public void removeUser(String userId) {
		JdbcTemplate template = ApplicationContextProvider.get().getBean("dbTemplate", JdbcTemplate.class);
		String deleteUser = "delete from users where user_id = '%s'";
		String deleteUserRoleMapping = "delete from mapping_user_role where user_id = '%s'";
		template.batchUpdate(deleteUser, deleteUserRoleMapping);
	}

	public void addUserRoles(final String userId, final String... roleIds) {
		JdbcTemplate template = ApplicationContextProvider.get().getBean("dbTemplate", JdbcTemplate.class);
		if (roleIds == null || roleIds.length == 0) {
			// TODO 国际化
			throw new RuntimeException("");
		}
		String sql = "insert into mapping_user_role (user_id, role_id) values (?, ?)";
		template.batchUpdate(sql, new BatchPreparedStatementSetter() {
			public void setValues(PreparedStatement ps, int index) throws SQLException {
				String roleId = roleIds[index];
				ps.setString(1, userId);
				ps.setString(2, roleId);
			}
			public int getBatchSize() {
				return roleIds.length;
			}
		});
	}

//	public void removeUserRoles(String user_id, String...roles) {
//		JdbcTemplate template = ApplicationContextProvider.get().getBean("dbTemplate", JdbcTemplate.class);
//		String sql = "";
//		if (roles == null || roles.length == 0) {
//			sql = String.format(DELETE_USER_ALL_ROLES, user_id);
//		} else {
//			String condition = "";
//			for (String role : roles) {
//				condition += ",'" + role + "'";
//			}
//			sql = String.format(DELETE_USER_ROLES, condition.substring(1), user_id);
//		}
//		template.execute(sql);
//	}
	
	public Map<String, List<String>> getUserRoles(String... user_ids) {
		JdbcTemplate template = ApplicationContextProvider.get().getBean("dbTemplate", JdbcTemplate.class);
		if (user_ids == null || user_ids.length == 0) {
			// TODO 国际化
			throw new RuntimeException("");
		}
		String condition = "";
		for (String user_id : user_ids) {
			condition += ",'" + user_id + "'";
		}
		List<Map<String, Object>> rows = template.queryForList(String.format(GET_ENABLED_USER_ROLES, condition.substring(1)));
		
		Map<String, List<String>> result = Maps.newLinkedHashMap();
		
		for (Map<String, Object> row : rows) {
			String user_id = String.valueOf(row.get("user_id"));
			String role = String.valueOf(row.get("role"));
			List<String> roles = result.get(user_id);
			if (roles == null) {
				roles = Lists.newArrayList();
				result.put(user_id, roles);
			}
			roles.add(role);
		}
		return result;
	}

}
