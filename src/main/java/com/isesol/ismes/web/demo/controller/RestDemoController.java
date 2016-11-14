package com.isesol.ismes.web.demo.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.collect.Maps;

/**
 * rest json demo
 * @author wangxu
 *
 */
@RestController
public class RestDemoController {
	
	@RequestMapping(value = "/rest", method = RequestMethod.GET)
	public Map<String, String> getLocale() {
		Map<String, String> map = Maps.newHashMap();
		map.put("a", "1");
		map.put("b", "2");
		map.put("c", "3");
		return map;
	}
}