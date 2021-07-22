<?php


//Пока всё сделанно. Проверь в конце ток.
//Методы тоже сделаны. пока что.



class Docs{

    // подключение к базе данных и таблице 'products' 
    private $conn;
    private $table_name = "Documents";

    // конструктор для соединения с базой данных 
    public function __construct($db){
        $this->conn = $db;
    }

// метод create - создание товаров 
function create($TechnicID, $ObjectID, $ClientID, $EmployeeID, $DocType, $DocHREF, $Desc){

    // запрос для вставки (создания) записей 
     $query = "INSERT INTO `Documents`(`TechnicID`, `ObjectID`, `WorkerID`, `EmployeeID`, `DocType`, `DocHREF`, `Description`)
     VALUES ( '$TechnicID', '$ObjectID', '$ClientID', '$EmployeeID', '$DocType', '$DocHREF', '$Desc')
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $TechnicID, PDO::PARAM_INT);
    $stmt->bindParam(2, $ObjectID, PDO::PARAM_INT);
    $stmt->bindParam(3, $ClientID, PDO::PARAM_INT);
    $stmt->bindParam(4, $EmployeeID, PDO::PARAM_INT);
    $stmt->bindParam(5, $DocType, PDO::PARAM_INT);
    $stmt->bindParam(6, $DocHREF, PDO::PARAM_INT);
    $stmt->bindParam(7, $Desc, PDO::PARAM_INT);
    
    
    $stmt->execute();

}


function Read($TechnicID, $ObjectID, $ClientID, $EmployeeID, $DocType, $DocHREF){
    
    // запрос для вставки (создания) записей 
     $query = "SELECT `DocumentID`, `DocHREF`, `Description` FROM `Documents` WHERE TechnicID = '$TechnicID' and ObjectID = '$ObjectID' and WorkerID = '$ClientID' and EmployeeID = '$EmployeeID' and DocType = '$DocType'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ObjectID, PDO::PARAM_INT);
    $stmt->bindParam(2, $ClientID, PDO::PARAM_INT);
    $stmt->bindParam(3, $EmployeeID, PDO::PARAM_INT);
    $stmt->bindParam(4, $DocType, PDO::PARAM_INT);
    
    $stmt->execute();
    return $stmt;
}

}
?>