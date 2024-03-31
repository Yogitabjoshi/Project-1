<?php include("connection.php");?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script defer src="login.js"></script>
</head>
<body> <div class="main-body">
    <main id="main-holder">
        <h1 id="station-header">Railway Seat Availability System </h1>
        <form action="" method="POST">
            <div>
                <label>From: </label><br />
                <select id="stationsSelectBox" class="custom_select" name="from">
                    <option value="">-- Select --</option>
                </select>
            </div>

            <div>
                <label>To: </label><br />
                <select id="stationsSelectBox2" class="custom_select" name="to">
                    <option value="">-- Select --</option>
                </select>
            </div>

            <div>
                <label>All Classes: </label><br />
                <select id="stationsSelectBox3" class="custom_select" name="class">
                    <option value="">-- Select --</option>
                </select>
            </div>

            <div>
                <label>General: </label><br />
                <select id="stationsSelectBox4"  class="custom_select"name="general">
                    <option value="">-- Select --</option>
                </select>
            </div>

            <div>
                <label for="date">Date</label><br />
                <input type="date" name="date" placeholder="date"name="date"> <br>
            </div>



            <div>
                 <input type="submit" value="submit" class="btn" name="submit">
            </div>
        </form>
    </main>

    <script>
        $(document).ready(function () {
            $.getJSON("stations.json",
                function (data) {
                    console.log(data);
                    data.stations.forEach(element => {
                        console.log(element)
                        let o = document.createElement('option');
                        o.text = element.name;
                        $('#stationsSelectBox, #stationsSelectBox2').append(o);

                    });
                })
        })
    </script>

    <script>
        $(document).ready(function () {
            $.getJSON("allclasses.json",
                function (data) {
                    console.log(data);
                    data.allclasses.forEach(element => {
                        console.log(element)
                        let o = document.createElement('option');
                        o.text = element.name;
                        $('#stationsSelectBox3').append(o);

                    });

                })
        })
    </script>

    <script>
        $(document).ready(function () {
            $.getJSON("general.json",
                function (data) {
                    console.log(data);
                    data.general.forEach(element => {
                        console.log(element)
                        let o = document.createElement('option');
                        o.text = element.name;
                        $('#stationsSelectBox4').append(o);

                    });

                })
        })
    </script>
    </div>

</body>
</html>


<?php
    if(isset($_POST['submit']))
    {
        $from = $_POST['from']; //$from name is different from from
        $to = $_POST['to'];
        $class = $_POST['class'];
        $general = $_POST['general'];
        

        $query = "SELECT * from railwaydb WHERE from_station = '$from' AND to_station = '$to'";

        $data= mysqli_query($conn,$query);

        if(mysqli_num_rows($data)>0)
        {
            
           // header('Location:display.php');

           ?>
           <h2 align="center">Total Seats Available</h2>
           <center><table border=3 cellspacing="7" width="88%">
               <tr>
                   <th width="13%">FROM</th>
                   <th width="15%">TO</th>
                   <th width="11%">CLASS</th>
                   <th width="14%">QUOTA</th>
                   <th width="6%">DATE</th>
                   <th width="6%">TIME</th>
                   <th width="9%">SEATS AVAILABLE</th>
                   <th width="5%">FARE</th>
                   <th width="4%">TRAINID</th>
                   <th width="5%">TRAINNAME</th>
               </tr>
          
   
   
   
       <?php

while($result = mysqli_fetch_assoc($data))
{
 echo "<tr>
         <td>".$result['from_station']."</td>
         <td>".$result['to_station']."</td>
         <td>".$result['allclasses']."</td>
         <td>".$result['quota']."</td>
         <td>".$result['date']."</td>
         <td>".$result['time']."</td>
         <td>".$result['seats_available']."</td>
         <td>".$result['fare']."</td>
         <td>".$result['trainid']."</td>
         <td>".$result['trainname']."</td>
       </tr>";
}


        }
        else
        {
            echo "Failed";
        }



    }

    









?>


