<?php
class Database {

    // укажите свои учетные данные базы данных 
    private $host = "localhost";
    private $db_name = "u0722320_kursovaya";
    private $username = "u0722320_mpa";
    private $password = "89031458261Mama.";
    public $conn;

    // получаем соединение с БД 
    public function getConnection(){

        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>