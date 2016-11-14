package com.isesol.ismes.web.security;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Component;

import com.google.common.collect.Lists;
import com.isesol.ismes.platform.core.service.bean.User;
import com.isesol.ismes.platform.module.Bundle;
import com.isesol.ismes.platform.module.Parameters;
import com.isesol.ismes.platform.module.Sys;
import com.isesol.ismes.platform.web.security.token.Auth;
import com.isesol.ismes.platform.web.security.token.TokenAuthentication;

@Component
public class DummyTokenAuthentication implements TokenAuthentication {
	
	

	public Auth authenticate(final String token) {
		Parameters parameters = new Parameters();
		parameters.set("token", token);
		final Bundle bundle = Sys.callModuleService("user", "userInfo", parameters);
		
		Auth auth =  new Auth() {
			private User user;
				public User getUser() {
					if(bundle.get("user") != null){
						Map<String, Object> userMap = ((Map<String, Object>) bundle.get("user"));
						user = new User(userMap.get("yggh").toString(), userMap.get("xm").toString(), userMap.get("yggh").toString());
						return user;
					}else{
						return null;
					}
				}
				
				public List<String> getRoles() {
					if (user == null) {
						user = getUser();
					}
					Parameters parameters = new Parameters();
					List<String> result = Lists.newArrayList();
					if(user != null){
						parameters.set("userId", user.getAccount());
						final Bundle bundle = Sys.callModuleService("user", "userRoleService", parameters);
						
						List<String> moduleRoles = (List<String>) bundle.get("moduleRoles");
						if (!CollectionUtils.isEmpty(moduleRoles)) {
							for (String moduleRole : moduleRoles) {
								result.add(moduleRole.split(",")[1]);
							}
						}
					}
					result.add("ROLE_USER");
					
					return result;
				}
				
			};
			
		if(bundle.get("user") != null){
			return auth;
		}else{
			return null;
		}
		
	}
}
