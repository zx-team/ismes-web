package com.isesol.ismes.web.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.isesol.ismes.platform.web.exception.user.UsernameNotFoundException;
import com.isesol.ismes.platform.web.security.UserIdPasswordAuth;
import com.isesol.ismes.web.security.demo.JdbcUserRoleService;

@Deprecated
@Component
public class UserIdPasswordAuthDemo implements UserIdPasswordAuth {

	private static final long serialVersionUID = 1L;
	
	@Autowired
	JdbcUserRoleService service;

	public List<String> getRoles(String userId) throws UsernameNotFoundException {
		checkUser(userId);
		return service.getUserRoles(userId).get(userId);
	}

	public String getPassword(String accountName) throws UsernameNotFoundException {
		checkUser(accountName);
		return String.valueOf(service.getUser(accountName).get("password"));
	}

	public boolean isEnabled(String accountName) throws UsernameNotFoundException {
		checkUser(accountName);
		return String.valueOf(service.getUser(accountName).get("enabled")).equals("1");
	}

	private void checkUser(String accountName) throws UsernameNotFoundException {
		// FIXME 在正式实现时需要考虑使用缓存
		if (accountName == null || "".equals(accountName)) {
			// FIXME 国际化
			throw new UsernameNotFoundException("空的用户名");
		}
		if (service.getUser(accountName).isEmpty()) {
			throw new UsernameNotFoundException("未找到用户名");
		}
	}

}
