<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FAZA GRUPOWA</title>
    <link href="css/fontello/css/lato.css" type="text/css" rel="stylesheet">
    <link href="css/group.css" type="text/css" rel="stylesheet">
</head>

<body>
    <section class='formCreation'>
        <h6>Nazwa turnieju</h6>
        <input class="text" type="text" name="name" placeholder="nazwa turnieju">
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

        <h2>FAZA PUCHAROWA*</h2>
        <h6>*(tymczasowe - tylko ilość meczów w pierwszej rundzie do awansów z grupy)</h6>
        <h6>Tryb fazy pucharowej</h6>
        <select name='play_offs'>
            <option value="1">Finał</option>
            <option value="2">Finał, Półfinały</option>
            <option value="4">Finał, Półfinały, Ćwierćfinały</option>
            <option value="8">Finał, Półfinały, Ćwierćfinały, 1/16</option>
            <option value="16">Finał, Półfinały, Ćwierćfinały, 1/16, 1/32</option>
        </select>
        <!-- <script>
            var manager = new Manager();
        </script> -->
        <a href='#' onclick="createGroup()">Dalej</a>
    </section>

    <section id='dashboardGroups'>
        <!-- <ul> -->
        <!-- GIVE RIGHTS: EDIT - ALLOWS TO EDIT MATCHES/SCORE/TEAMS; OTHERS NO -->
        <!-- <ul>
        <li><a onclick="groupMode('teams', 'xd')">Edytuj? drużyny</a></li>
        <li><a onclick="groupMode('table', 'cd')">Tabela</a></li>
        <li><a onclick="groupMode('matches', 'cd')">Mecze</a></li>
        <li><a onclick="groupMode('promote', 'ds')">Awans</a></li>
        </ul> -->
    </section>


    <script src="js/structure.js" type='text/javascript'></script>
    <script src="js/group.js" type='text/javascript'></script>
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