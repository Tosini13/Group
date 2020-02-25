<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FAZA GRUPOWA</title>
    <link href="css/fontello/css/lato.css" type="text/css" rel="stylesheet">
    <link href="css/group.css" type="text/css" rel="stylesheet">
</head>

<body>
    <section>
        <h2>FAZA GRUPOWA</h2>
        <h6>Liczba drużyn</h6>
        <select class="number" name="no_teams">
            <?php
            for ($i = 2; $i < 97; $i++) {
                echo "<option value='" . $i . "'>" . $i . "</option>";
            }
            ?>
        </select>
        <h6>Ilość grup</h6>
        <select class="number" name="no_groups">
            <option value="1">1</option>
            <?php
            for ($i = 2; $i < 17; $i *= 2) {
                echo "<option value='" . $i . "'>" . $i . "</option>";
            }
            ?>
        </select>
        <h6>Rewanże</h6>
        <input type="checkbox" name="revange_group">
        <h6>Punkty za wygraną</h6>
        <input class="number" type="text" name="win_points" value="3">
        <h6>Punkty za remis</h6>
        <input class="number" type="text" name="draw_points" value="1">
        <a href='#' onclick="groupInit()">Dalej</a>
    </section>
    <section class='matches'>
        <div class='match'>
            <div></div>
            <div class='teams'><input type='text' class='team' name='home' placeholder="home"> vs <input type='text' class='team' name='away' placeholder="away"></div>
        </div>
    </section>

    <section class="dashboardGroup">
        <ul>
            <!-- GIVE RIGHTS: EDIT - ALLOWS TO EDIT MATCHES/SCORE/TEAMS; OTHERS NO -->
            <?php $rights = 'EDIT' ?>
            <?php //$right = 'NO' 
            ?>
            <li><a onclick="groupMode('teams', '<?php echo $rights ?>')">Edytuj? drużyny</a></li>
            <li><a onclick="groupMode('table', '<?php echo $rights ?>')">Tabela</a></li>
            <li><a onclick="groupMode('matches', '<?php echo $rights ?>')">Mecze</a></li>
            <li><a onclick="groupMode('promote', '<?php echo $rights ?>')">Awans</a></li>
        </ul>
        <div id='my_react'></div>
    </section>


    <script src="js/structure.js" type='text/javascript'></script>
    <!-- JavaScript -->
    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <!-- JSX -->
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <!-- Load our React component. -->
    <script src="js/my_react.js" type='text/babel'></script>
</body>

</html>