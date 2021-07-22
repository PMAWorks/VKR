<?php
// необходимые HTTP-заголовки 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// подключение файла для соединения с базой и файл с объектом 
include_once '../config/database.php';
include_once '../objects/Worker.php';

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
$Workers = new Workers($db);

$WorkerID = $_POST['WorkerID'];

$stmt = $Workers->ReadOne($WorkerID);
$num = $stmt->rowCount();

if ($num>0) {

    // массив товаров 
    $products_arr=array();
    $products_arr["Worker"]=array();

    // получаем содержимое нашей таблицы 
    // fetch() быстрее, чем fetchAll() 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // извлекаем строку 
        extract($row);
        
        $product_item=array(
            "WorkerID" => $WorkerID,
            "Name" => $Name,
            "PassportSer" => $PassportSer,
            "PassportNumber" => $PassportNumber,
            "Adress" => $Adress,
            "WorkDay" => $WorkDay,
            "WorkEndDate" => $WorkEndDate,
            "Birthday" => $Birthday,
            "Salary" => $Salary,
            "Avans" => $Avans,
            "WorkerChief" => $WorkerChief,
            "WorkerPhoto" => $WorkerPhoto,
            "Phone" => $Phone,
            "Email" => $Email
        );

        array_push($products_arr["Worker"], $product_item);
    }
        // устанавливаем код ответа - 200 OK 
    http_response_code(200);

    // выводим данные о товаре в формате JSON 
    echo json_encode($products_arr);
}

else {
    // код ответа - 404 Не найдено 
    http_response_code(200);
     echo json_encode(0);
}
?>