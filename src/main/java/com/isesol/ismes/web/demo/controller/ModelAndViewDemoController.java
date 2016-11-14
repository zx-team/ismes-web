package com.isesol.ismes.web.demo.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.isesol.ismes.platform.core.ContextHolder;
import com.isesol.ismes.platform.core.service.I18NService;
import com.isesol.ismes.platform.core.service.exception.NoSuchMessageException;
import com.isesol.ismes.platform.module.Sys;

@Controller
public class ModelAndViewDemoController {

	private static Logger logger = LoggerFactory.getLogger(ModelAndViewDemoController.class);

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(Model model, String error, String logout) {
		if (error != null)
			model.addAttribute("error", "用户名或密码错误！");

		if (logout != null)
			model.addAttribute("message", "您已成功注销！");

		//return "redirect:login/login/login";
		return "redirect:login/login/login";
	}

	@RequestMapping(value = "/loginToken", method = RequestMethod.POST)
	public String loginToken(String token, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		request.
//		request.se
		response.addHeader("wangxu", "abc");
		return "redirect:login/authToken";
	}

	@RequestMapping(value = { "/403" }, method = RequestMethod.GET)
	public String forbidden() {
		return "403";
	}

	/**
	 * 国际化及消息文件的支持
	 */
	@Autowired
	private I18NService message;
	@Autowired
	private ContextHolder contextHolder;

	@RequestMapping(value = { "/", "/welcome**" }, method = RequestMethod.GET)
	public ModelAndView welcomePage() throws NoSuchMessageException {

		logger.info("测试日志功能:{}", contextHolder.getContext().getUserIdentifier());

		ModelAndView model = new ModelAndView();
		// 设置内容
		model.addObject("titleContent",
				message.getMessage(null, "titleContent",
						new Object[] { contextHolder.getContext().getUserIdentifier() },
						contextHolder.getContext().getLocale()));
		model.addObject("messageContent",
				message.getMessage(null, "welcome.message", null, contextHolder.getContext().getLocale()));
		// 设置跳转页面
		
		//Sys.setPreference(key, value);
		model.setViewName("index");
		return model;
	}

	@RequestMapping(value = "/admin**", method = RequestMethod.GET)
	public ModelAndView adminPage() throws NoSuchMessageException {
		ModelAndView model = new ModelAndView();
		// 设置内容
		model.addObject("titleContent",
				message.getMessage(null, "titleContent",
						new Object[] { contextHolder.getContext().getUserIdentifier() },
						contextHolder.getContext().getLocale()));
		model.addObject("messageContent",
				message.getMessage(null, "admin.message", null, contextHolder.getContext().getLocale()));
		// 设置跳转页面
		model.setViewName("admin");
		return model;
	}

	@RequestMapping(value = "/dba**", method = RequestMethod.GET)
	public ModelAndView dbaPage() throws NoSuchMessageException {
		ModelAndView model = new ModelAndView();
		// 设置内容
		model.addObject("titleContent",
				message.getMessage(null, "titleContent", new Object[] { contextHolder.getContext().getUserIdentifier() }, contextHolder.getContext().getLocale()));
		model.addObject("messageContent",
				message.getMessage(null, "dba.message", null, contextHolder.getContext().getLocale()));
		// 设置跳转页面
		model.setViewName("admin");
		return model;
	}
}