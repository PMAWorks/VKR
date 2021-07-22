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


$Name = $_POST['Name'];
$PassportSer = $_POST['PassportSer'];
$PassportNumber = $_POST['PassportNumber'];
$Adress = $_POST['Adress'];
$WorkDay = $_POST['WorkDay'];
$WorkEndDate = $_POST['WorkEndDate'];
$Birthday = $_POST['Birthday'];
$Salary = $_POST['Salary'];
$Avans = $_POST['Avans'];
$WorkerChief = $_POST['WorkerChief'];
$photo = $_POST['photo'];
$ObjectID = $_POST['ObjectID'];
$Phone = $_POST['Phone'];
$Email = $_POST['Email'];

// прочитаем детали товара для редактирования
$Workers->create($Name, $PassportSer, $PassportNumber, $Adress, $WorkDay, $WorkEndDate, $Birthday, $Salary, $Avans, $WorkerChief, $CompanyName, $photo, $Phone, $Email);
$stmt = $Workers->ReadAll();
$num = $stmt->rowCount();

if ($num>0) {

    // массив товаров 
    $products_arr=array();
    $products_arr["Workers"]=array();
    $Por = 0;
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

        array_push($products_arr["Workers"], $product_item);
        $Por++;
        if($Por == $num){
            $Workers -> CreateWorkerOnObject($WorkerID, $ObjectID, $WorkDay, $WorkEndDate);
        }
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