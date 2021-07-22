<?php


//Пока всё сделанно. Проверь в конце ток.
//Методы тоже сделаны. пока что.



class Clients {

    // подключение к базе данных и таблице 'products' 
    private $conn;
    private $table_name = "Clients";

    // конструктор для соединения с базой данных 
    public function __construct($db){
        $this->conn = $db;
    }

// метод create - создание товаров 
function create($Phone, $Email, $Adress, $ClientName, $INN, $OGRN, $Bank, $RasSchet, $KorrSchet, $BIK, $CompanyName){

    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "INSERT INTO `Clients`
     (`Phone`, `Email`, `Adress`, `ClientName`, `INN`, `OGRN`, `Bank`, `RasSchet`, `KorrSchet`, `BIK`, `CompanyName`) 
     VALUES 
     ('$Phone', '$Email', '$Adress' , '$ClientName', '$INN', '$OGRN', '$Bank', '$RasSchet' , '$KorrSchet' , '$BIK' , '$CompanyName')
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $Phone, PDO::PARAM_INT);
    $stmt->bindParam(2, $Email, PDO::PARAM_INT);
    $stmt->bindParam(3, $Adress, PDO::PARAM_INT);
    $stmt->bindParam(4, $ClientName, PDO::PARAM_INT);
    $stmt->bindParam(5, $INN, PDO::PARAM_INT);
    $stmt->bindParam(6, $OGRN, PDO::PARAM_INT);
    $stmt->bindParam(7, $Bank, PDO::PARAM_INT);
    $stmt->bindParam(8, $RasSchet, PDO::PARAM_INT);
    $stmt->bindParam(9, $KorrSchet, PDO::PARAM_INT);
    $stmt->bindParam(10, $BIK, PDO::PARAM_INT);
    $stmt->bindParam(11, $CompanyName, PDO::PARAM_INT);
    
    $stmt->execute();
    
    return $stmt;

}

function Read(){

    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT `ClientID`, `Phone`, `Email`, `Adress`, `ClientName`, `INN`, `OGRN`, `Bank`, `RasSchet`, `KorrSchet`, `BIK`, `CompanyName` FROM `Clients`
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt -> execute();
    return $stmt;
}


function ReadForEmployee($EmployeeID){
    // запрос для вставки (создания) записей 
     $query = "SELECT 
                    cl.ClientID, 
                    cl.Phone, 
                    cl.Email, 
                    cl.Adress, 
                    cl.ClientName, 
                    cl.INN, 
                    cl.OGRN, 
                    cl.Bank, 
                    cl.RasSchet, 
                    cl.KorrSchet, 
                    cl.BIK, 
                    cl.CompanyName 
                    FROM `Clients` cl
                    LEFT JOIN Objects Ob on Ob.ClientID = cl.ClientID
                    where Ob.EmployeeID = '$EmployeeID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $EmployeeID, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}



function ReadOne($ClientID){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT `ClientID`, `Phone`, `Email`, `Adress`, `ClientName`, `INN`, `OGRN`, `Bank`, `RasSchet`, `KorrSchet`, `BIK`, `CompanyName` FROM `Clients` where ClientID = '$ClientID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ClientID, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}

function GetClientObjects($ClientID){
    // запрос для вставки (создания) записей 
     $query = "SELECT `ObjectID`, `Name`, `ObjectType`, `MainPhoto`, `StartDate`, `EndDate` FROM `Objects` WHERE ClientID = '$ClientID'
            ";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $ClientID, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}
}
?>