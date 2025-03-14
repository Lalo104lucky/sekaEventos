package mx.edu.utez.seka_eventos.kernel;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class DBConnection {

    @Value("jdbc:mysql://localhost:3306/seka_eventos")
    private String BD_URL;

    @Value("${db.username}")
    private String BD_USER;

    @Value("root")
    private String BD_PASSWORD;

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl(BD_URL);
        dataSource.setUsername(BD_USER);
        dataSource.setPassword(BD_PASSWORD);

        return dataSource;
    }
}
