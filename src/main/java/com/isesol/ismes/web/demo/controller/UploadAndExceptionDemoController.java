package com.isesol.ismes.web.demo.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.isesol.ismes.platform.core.service.FileService;
import com.isesol.ismes.platform.core.service.exception.FileException;
import com.isesol.ismes.platform.web.exception.BusinessException;

/**
 * 文件上传样例
 * @author wangxu
 *
 */
@Controller
public class UploadAndExceptionDemoController {
	
	//@Autowired
	private FileService service;

	// 多文件上传@RequestParam("file") MultipartFile[] files
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public String upload(@RequestParam("file") MultipartFile file) throws BusinessException {
		try {
			service.saveFile("d:\\" + file.getOriginalFilename(), file.getInputStream());
		} catch (FileException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "upload";
	}
	
	@RequestMapping(value = "/uploadPage", method = RequestMethod.GET)
	public String uploadPage() {
		return "upload";
	}
	
	@RequestMapping(value = "/testException", method = RequestMethod.GET)
	public String testException() throws BusinessException {
		throw new BusinessException("exception.file.dir.nonexist", "/etc/profile");
	}
	
	@RequestMapping(value = "/accessException", method = RequestMethod.GET)
	public String testAccessException(HttpServletResponse response) throws IOException{
		response.sendError(404);
		return null;
	}

}