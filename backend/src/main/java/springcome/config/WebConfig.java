package springcome.config;

import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import springcome.interceptor.RouterInterceptor;

@Configuration
@PropertySource("classpath:springcome/config/WebConfig.properties")
public class WebConfig implements WebMvcConfigurer {
	
	@Autowired
	private Environment env;
	
	// Interceptors
	@Bean
	public HandlerInterceptor routerInterceptor() {
		return new RouterInterceptor();
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
//		registry.addInterceptor(routerInterceptor())
//				.addPathPatterns("/")
//				.addPathPatterns("/schedule")
//				.addPathPatterns("/profile")
//				.addPathPatterns("/board/**");
				

	}
	
	// Message Converter
	@Bean
	public StringHttpMessageConverter stringHttpMessageConverter() {
		StringHttpMessageConverter messageConverter = new StringHttpMessageConverter();
		messageConverter.setSupportedMediaTypes(
			Arrays.asList(
				new MediaType("text", "html", Charset.forName("utf-8")))
			);

		return messageConverter;
	}
	
	@Bean
	public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter() {
		Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder()
			.indentOutput(true)                              //JSON 들여쓰기 
			.dateFormat(new SimpleDateFormat("yyyy-mm-dd")); //Date and Time 포맷지정
		
		MappingJackson2HttpMessageConverter messageConverter = new MappingJackson2HttpMessageConverter(builder.build());
		messageConverter.setSupportedMediaTypes(
			Arrays.asList(
				new MediaType("application", "json", Charset.forName("utf-8"))
			)
		);
		
		return messageConverter;
	}
	
	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		converters.add(stringHttpMessageConverter());
		converters.add(mappingJackson2HttpMessageConverter());
	}
	
	//
	// Resource Mapping(URL Magic Mapping)
	//
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry
			.addResourceHandler(env.getProperty("fileupload.resourceMapping"))
			.addResourceLocations("file:" + env.getProperty("fileupload.uploadLocation"));
	}	
	
	
}
