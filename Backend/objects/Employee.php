<?php
use PHPMailer\PHPMailer\PHPMailer;
require '../PHPMailer-master/src/PHPMailer.php';

//Пока всё сделанно. Проверь в конце ток.
//Методы тоже сделаны. пока что.



class Employee {

    // подключение к базе данных и таблице 'products' 
    private $conn;
    private $table_name = "Employee";

    // конструктор для соединения с базой данных 
    public function __construct($db){
        $this->conn = $db;
    }



function ReadOne($Login, $Password){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT `EmployeeID`, `Name`, `PassportSer`, `PassportNumber`, `StartWork`, `Salary`, `Role`, `Birthday`, `Password`, `Email`, `Phone`, `EmployeePhoto` FROM `Employee` WHERE (Email = '$Login' or Phone = '$Login') and Password = '$Password'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $Login, PDO::PARAM_INT);
    $stmt->bindParam(2, $Password, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}

function UpdateEmployee($Photo, $Name, $PasportSer, $PassportNumber, $Adres, $StartDate, $BirthDay, $Salary, $Role, $Phone, $Email, $EmployeeID){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "UPDATE `Employee` 
     SET 
     `Name`='$Name',
     `PassportSer`='$PasportSer',
     `PassportNumber`='$PassportNumber',
     `StartWork`='$StartDate',
     `Salary`='$Salary',
     `Role`= '$Role',
     `Birthday`= '$BirthDay',
     `Email`= '$Email',
     `Phone`= '$Phone',
     `EmployeePhoto`= '$Photo',
     `Adres`= '$Adres'
     WHERE EmployeeID = '$EmployeeID'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $Photo, PDO::PARAM_INT);
    $stmt->bindParam(2, $Name, PDO::PARAM_INT);
    $stmt->bindParam(3, $PasportSer, PDO::PARAM_INT);
    $stmt->bindParam(4, $PassportNumber, PDO::PARAM_INT);
    $stmt->bindParam(5, $Adres, PDO::PARAM_INT);
    $stmt->bindParam(6, $StartDate, PDO::PARAM_INT);
    $stmt->bindParam(7, $BirthDay, PDO::PARAM_INT);
    $stmt->bindParam(8, $Salary, PDO::PARAM_INT);
    $stmt->bindParam(9, $Role, PDO::PARAM_INT);
    $stmt->bindParam(10, $Phone, PDO::PARAM_INT);
    $stmt->bindParam(11, $Email, PDO::PARAM_INT);
    $stmt->bindParam(12, $EmployeeID, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}

function ReadForForget($Login){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT `Email` FROM `Employee` WHERE (Email = '$Login' or Phone = '$Login')";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $Login, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}

function UpdateResetToken($Email, $ResetToken){
    // запрос для вставки (создания) записей 
     $query = "UPDATE `Employee` SET `ResetPassToken`='$ResetToken' WHERE Email = '$Email'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $Email, PDO::PARAM_INT);
    $stmt->bindParam(2, $ResetToken, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}

function UpdatePass($Pass, $ResetToken){
    // запрос для вставки (создания) записей 
     $query = "UPDATE `Employee` SET `Password`='$Pass' WHERE ResetPassToken = '$ResetToken'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $Pass, PDO::PARAM_INT);
    $stmt->bindParam(2, $ResetToken, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}


function MessageForReset($Email, $Token){


$ForgetPage = 'https://pavlovichm.site/ResetPass/'.$Token;


$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';
$mail->setFrom('mail@pamian.site', 'СТройТрансГаз'); // от кого (email и имя)
$mail->addAddress($Email);  // кому (email и имя)
$mail->Subject = 'Восстановление пароля';                         // тема письма
// html текст письма
$mail->msgHTML('<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Demystifying Email Design</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin: 0; padding: 0;">
   <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
        <tr>
            <td style="padding: 10px 0 30px 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-radius: 20px;">
                    <tr>
                        <td align="center" style="padding: 0px 0 0px 0; color: #2450EC; font-size: 36px; font-weight: bold; font-family: Arial, sans-serif;">
                        	СтройТрансГаз
                        </td>
                    </tr>
                    <tr>
                            <td align="center" style="color: #153643; padding: 0px 0px 20px 0px; font-family: Arial, sans-serif; font-size: 16px;">
                                   <b>Вы получили это сообщение, так как попытались изменить пароль от личного кабинета</b>
                            </td>
                    </tr>
                    <tr>
                            <td align="center" style="color: #153643; padding: 0px 0px 20px 0px; font-family: Arial, sans-serif; font-size: 16px;">
                                   <a href="'.$ForgetPage.'" style="text-decoration: none;"><div style="width: 130px;height: 25px;padding-top: 10px;background-color: #FF948D;text-decoration: none;color: white;font-family: Roboto;font-style: normal;font-weight: bold;font-size: 14px;line-height: 14px;text-align: center;border-radius: 33px;">Изменить</div></a>
                            </td>
                    </tr>
                    <tr>
                            <td align="center" style="color: #153643; padding: 0px 0px 20px 0px; font-family: Arial, sans-serif; font-size: 16px;">
                                   <b>Если вы не хотели восстановить пароль, просто проигнорируйте это сообщение</b>
                            </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>');


// Отправляем
$mail->send();
}


function MessageForDeveloper($Name, $Phone, $Email, $Problem){


$ForgetPage = 'https://pavlovichm.site/ResetPass/'.$Token;


$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';
$mail->setFrom('mail@pamian.site', 'СТройТрансГаз'); // от кого (email и имя)
$mail->addAddress('michanya1045@gmail.com');  // кому (email и имя)
$mail->Subject = 'Сообщение от пользователя СтройТрансГаз';                         // тема письма
// html текст письма
$mail->msgHTML('<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Demystifying Email Design</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin: 0; padding: 0;">
   <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
        <tr>
            <td style="padding: 10px 0 30px 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-radius: 20px;">
                    <tr>
                        <td><strong>Имя :</strong>'.$Name.'</td>
                    </tr>
                    <tr>
                        <td><strong>Телефон :</strong>'.$Phone.'</td>
                    </tr>
                    <tr>
                        <td><strong>Email :</strong>'.$Email.'</td>
                    </tr>
                    <tr>
                        <td><strong>Сообщение :</strong>'.$Problem.'</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>');


// Отправляем
$mail->send();
}


function ReadOneEmployee($EmployeeID){

    // запрос для вставки (создания) записей 
     $query = "SELECT `EmployeeID`, `Name`, `PassportSer`, `PassportNumber`, `StartWork`, `Salary`, `Role`, `Birthday`, `Password`, `Email`, `Phone`, `EmployeePhoto`, `Adres` FROM `Employee` WHERE EmployeeID = '$EmployeeID'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $EmployeeID, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}

function DeleteEmployee($EmployeeID){

    // запрос для вставки (создания) записей 
     $query = "DELETE FROM `Employee` WHERE EmployeeID = '$EmployeeID'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $EmployeeID, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}

function ReadOneEmployeeObjects($EmployeeID){

    // запрос для вставки (создания) записей 
     $query = "SELECT `ObjectID`, `Name`, `ObjectType`, `MainPhoto`, `StartDate`, `EndDate`, `Status` FROM `Objects` WHERE EmployeeID = '$EmployeeID'";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $EmployeeID, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}



function ReadAll(){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "SELECT `EmployeeID`, `Name`, `PassportSer`, `PassportNumber`, `StartWork`, `Salary`, `Role`, `Birthday`, `Password`, `Email`, `Phone`, `EmployeePhoto` FROM `Employee`";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    
    $stmt -> execute();
    return $stmt;
}


function CreateEmployee($Photo, $Name, $PasportSer, $PassportNumber, $Adres, $StartDate, $BirthDay, $Salary, $Role, $Phone, $Email, $Password){
    $CreateDate = date('Y-m-d H:i:s');
    // запрос для вставки (создания) записей 
     $query = "INSERT INTO `Employee`(`Name`, `PassportSer`, `PassportNumber`, `StartWork`, `Salary`, `Role`, `Birthday`, `Password`, `Email`, `Phone`, `EmployeePhoto`, `Adres`) 
     VALUES ('$Name', '$PasportSer', '$PassportNumber' , '$StartDate', '$Salary', '$Role', '$BirthDay', '$Password' , '$Email' , '$Phone' , '$Photo', '$Adres')";

    // подготовка запроса 
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $Photo, PDO::PARAM_INT);
    $stmt->bindParam(2, $Name, PDO::PARAM_INT);
    $stmt->bindParam(3, $PasportSer, PDO::PARAM_INT);
    $stmt->bindParam(4, $PassportNumber, PDO::PARAM_INT);
    $stmt->bindParam(5, $Adres, PDO::PARAM_INT);
    $stmt->bindParam(6, $StartDate, PDO::PARAM_INT);
    $stmt->bindParam(7, $BirthDay, PDO::PARAM_INT);
    $stmt->bindParam(8, $Salary, PDO::PARAM_INT);
    $stmt->bindParam(9, $Role, PDO::PARAM_INT);
    $stmt->bindParam(10, $Phone, PDO::PARAM_INT);
    $stmt->bindParam(11, $Email, PDO::PARAM_INT);
    $stmt->bindParam(12, $Password, PDO::PARAM_INT);
    
    $stmt -> execute();
    return $stmt;
}



}
?>