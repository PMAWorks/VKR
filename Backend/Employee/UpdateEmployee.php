<?php
// необходимые HTTP-заголовки 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// подключение файла для соединения с базой и файл с объектом 
include_once '../config/database.php';
include_once '../objects/Employee.php';

if($_SERVER['HTTP_REFERER']){
        $pieces = explode("/", $_SERVER['HTTP_REFERER']);
        if($pieces[2] != 'pamian.site'){
            http_response_code(200);
            echo json_encode('Неавторизированное обращение. В доступе отказано.');
            return;
        }
}
else{
        echo('Неавторизированное обращение. В доступе отказано.');
        return;
}

// получаем соединение с базой данных 
$database = new Database();
$db = $database->getConnection();

// подготовка объекта 
$Employee = new Employee ($db);

$Photo = $_POST['Photo'];
$Name = $_POST['Name'];
$PasportSer = $_POST['PasportSer'];
$PassportNumber = $_POST['PassportNumber'];
$Adres = $_POST['Adres'];
$StartDate = $_POST['StartDate'];
$BirthDay = $_POST['BirthDay'];
$Salary = $_POST['Salary'];
$Role = $_POST['Role'];
$Phone = $_POST['Phone'];
$Email = $_POST['Email'];
$EmployeeID = $_POST['EmployeeID'];
// прочитаем детали товара для редактирования

$stmt = $Employee->UpdateEmployee($Photo, $Name, $PasportSer, $PassportNumber, $Adres, $StartDate, $BirthDay, $Salary, $Role, $Phone, $Email, $EmployeeID);
$stmt = $Employee->ReadOneEmployee($EmployeeID);
$num = $stmt->rowCount();

if ($num>0) {

    // массив товаров 
    $products_arr=array();
    $products_arr["Employee"]=array();

    // получаем содержимое нашей таблицы 
    // fetch() быстрее, чем fetchAll() 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // извлекаем строку 
         extract($row);
        
        $product_item=array(
            "EmployeeID" => $EmployeeID,
            "Name" => $Name,
            "PassportSer" => $PassportSer,
            "PassportNumber" => $PassportNumber,
            "StartWork" => $StartWork,
            "Salary" => $Salary,
            "Role" => $Role,
            "Adres" => $Adres,
            "Birthday" => $Birthday,
            "Password" => $Password,
            "Email" => $Email,
            "Phone" => $Phone,
            "EmployeePhoto" => $EmployeePhoto
        );

        array_push($products_arr["Employee"], $product_item);
    }
    
        // устанавливаем код ответа - 200 OK 
    http_response_code(200);

    // выводим данные о товаре в формате JSON 
    echo json_encode($products_arr);
}

else {
    // код ответа - 404 Не найдено 
    http_response_code(200);
    // сообщим пользователю, что товар не существует 
     echo json_encode(0);
}
?>