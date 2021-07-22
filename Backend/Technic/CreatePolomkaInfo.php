<?php
// необходимые HTTP-заголовки 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// подключение файла для соединения с базой и файл с объектом 
include_once '../config/database.php';
include_once '../objects/Technic.php';

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
$Technic = new Technic($db);

$Des = $_POST["Des"];
$PolomkaDate = $_POST["PolomkaDate"];
$TechnicID = $_POST['TechnicID'];
$Status = $_POST['Status'];
$EmployeeID = $_POST['EmployeeID'];
// прочитаем детали товара для редактирования

$stmt = $Technic->createPolomkaInfo($Des, $PolomkaDate, $TechnicID, $Status, $EmployeeID);

$stmt = $Technic->GetPolomkaInfo($TechnicID);
$num = $stmt->rowCount();

if ($num>0) {

    // массив товаров 
    $products_arr=array();
    $products_arr["PolomkaInfo"]=array();

    // получаем содержимое нашей таблицы 
    // fetch() быстрее, чем fetchAll() 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // извлекаем строку 
        extract($row);
        
        $product_item=array(
            "PolomkaID" => $PolomkaID,
            "PolomkaDes" => $PolomkaDes,
            "date" => $date,
            "Status" => $Status
        );

        array_push($products_arr["PolomkaInfo"], $product_item);
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