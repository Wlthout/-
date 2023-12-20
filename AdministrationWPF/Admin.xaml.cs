using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using MySql.Data.MySqlClient;

namespace AdministrationWPF
{
    /// <summary>
    /// Логика взаимодействия для WorkWithData.xaml
    /// </summary>
    public partial class Admin : Window
    {
        public Admin()
        {
            InitializeComponent();
            InputCars();
            InputViolations();
            VisibleElement();
            Choice();
        }

        public void InputCars()
        {
            DBL dbl = new DBL();
            dbl.openConnection();
            string com = "SELECT CarNumber FROM cars";
            MySqlCommand command = new MySqlCommand(com, dbl.connection);
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            adapter.SelectCommand = command;
            DataTable table = new DataTable();
            adapter.Fill(table);
            dbl.closeConnection();
            List<string> list = new List<string>();
            for (int i = 0; i < table.Rows.Count; i++)
            {
                list.Add(table.Rows[i]["CarNumber"].ToString());
            }
            comboBox.ItemsSource = list;
        }
        public void InputViolations()
        {
            DBL dbl = new DBL();
            dbl.openConnection();
            string com = "SELECT Article, Paragraph, Text, Penalty FROM violations";
            MySqlCommand command = new MySqlCommand(com, dbl.connection);
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            adapter.SelectCommand = command;
            DataTable table = new DataTable();
            adapter.Fill(table);
            dbl.closeConnection();
            dataGrid.ItemsSource = table.DefaultView;
            
        }
        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            Application.Current.Shutdown();
        }
        private void comboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            comboBox2.ItemsSource = null;
            comboBox2.Items.Clear();
            if (comboBox.SelectedValue == null)
            {
                return;
            }
            DBL dbl = new DBL();
            dbl.openConnection();
            string com = "SELECT u.Surname, u.FirstName, u.MiddleName, u.UserType FROM users u JOIN userscars us ON u.IdUser = us.IdUser" +
            " JOIN cars c ON c.IdCar = us.IdCar WHERE c.CarNumber = '" + comboBox.SelectedValue + "'";
            MySqlCommand command = new MySqlCommand(com, dbl.connection);
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            adapter.SelectCommand = command;
            DataTable table = new DataTable();
            adapter.Fill(table);
            List<string> list = new List<string>();
            for (int i = 0; i < table.Rows.Count; i++)
            {
                string type = table.Rows[i]["UserType"].ToString();
                if (type == "DRIVER")
                {
                    type = "(Водитель)";
                }
                else
                {
                    type = "(Владелец)";
                }
                string data = table.Rows[i]["Surname"].ToString() + " " + table.Rows[i]["FirstName"].ToString() + " " +
                    table.Rows[i]["MiddleName"].ToString() + " " + type + " ";
                list.Add(data);
            }
            comboBox2.ItemsSource = list;
            dbl.closeConnection();
        }
        private void comboBox2_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            comboBox3.ItemsSource = null;
            comboBox3.Items.Clear();
            DBL dbl = new DBL();
            dbl.openConnection();
            if (comboBox2.SelectedValue == null)
            {
                return;
            }
            string[] array = comboBox2.SelectedValue.ToString().Split(' ');
            string com = "SELECT v.Article, v.Paragraph, v.Text FROM users u JOIN records r ON r.IdUser = u.IdUser" +
            " JOIN violations v ON v.IdViolation = r.IdViolation JOIN cars c ON c.IdCar = r.IdCar WHERE r.IsDeleted = 0 AND c.CarNumber = '" + 
            comboBox.SelectedValue + "' AND u.Surname = '" + array[0] + "' AND u.FirstName = '" + array[1] + "' AND u.MiddleName = '" +
            array[2] + "'";
            MySqlCommand command = new MySqlCommand(com, dbl.connection);
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            adapter.SelectCommand = command;
            DataTable table = new DataTable();
            adapter.Fill(table);
            List<string> list = new List<string>();
            for (int i = 0; i < table.Rows.Count; i++)
            {
                string data = "18." + table.Rows[i]["Article"].ToString() + "." + table.Rows[i]["Paragraph"].ToString() + "." +
                    table.Rows[i]["Text"].ToString();
                list.Add(data);
            }
            comboBox3.ItemsSource = list;
            dbl.closeConnection();
        }
        private void comboBox4_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (comboBox4.SelectedValue.ToString() == "Удалить нарушение")
            {
                button1.Visibility = Visibility.Visible;
                button2.Visibility = Visibility.Collapsed;
                textBox1.Visibility = Visibility.Collapsed;
                textBox2.Visibility = Visibility.Collapsed;
                label1.Visibility = Visibility.Collapsed;
                label2.Visibility = Visibility.Collapsed;
            }
            else if (comboBox4.SelectedValue.ToString() == "Добавить нарушение")
            {
                button2.Visibility = Visibility.Visible;
                button1.Visibility = Visibility.Collapsed;
                textBox1.Visibility = Visibility.Visible;
                textBox2.Visibility = Visibility.Visible;
                label1.Visibility = Visibility.Visible;
                label2.Visibility = Visibility.Visible;
            }

        }
        public void Choice()
        {
            List<string> list = new List<string>();
            list.Add("Удалить нарушение");
            list.Add("Добавить нарушение");
            comboBox4.ItemsSource = list;
        }
        public void VisibleElement()
        {
            button1.Visibility = Visibility.Collapsed;
            button2.Visibility = Visibility.Collapsed;
            textBox1.Visibility = Visibility.Collapsed;
            textBox2.Visibility = Visibility.Collapsed;
            label1.Visibility = Visibility.Collapsed;
            label2.Visibility = Visibility.Collapsed;
        }
        private void button1_Click(object sender, RoutedEventArgs e)
        {
            string[] array = comboBox2.SelectedValue.ToString().Split(' ');
            string[] arrays = comboBox3.SelectedValue.ToString().Split('.');
            DBL dbl = new DBL();
            dbl.openConnection();
            string com = "SELECT u.IdUser, c.IdCar, v.IdViolation FROM users u JOIN records r ON u.IdUser = r.IdUser JOIN " +
                "cars c ON c.IdCar = r.IdCar JOIN violations v ON v.IdViolation = r.IdViolation WHERE r.IsDeleted = 0 AND c.CarNumber = '" + 
                comboBox.SelectedValue + "' AND u.Surname = '" + array[0] + "' AND u.FirstName = '" + array[1] + "' AND u.MiddleName = '" + 
                array[2] + "'" + " AND v.Article = '" + arrays[1]  + "' AND v.Paragraph = '" + arrays[2] + "'";
            MySqlCommand command = new MySqlCommand(com, dbl.connection);
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            adapter.SelectCommand = command;
            DataTable table = new DataTable();
            adapter.Fill(table);
            int UserID = Convert.ToInt32(table.Rows[0]["IdUser"]);
            int CarID = Convert.ToInt32(table.Rows[0]["IdCar"]);
            int ViolationID = Convert.ToInt32(table.Rows[0]["IdViolation"]);
            dbl.closeConnection();
            dbl.openConnection();
            com = "UPDATE records SET IsDeleted = 1 WHERE IdUser = " + UserID + " AND IdCar = " + CarID + " AND IdViolation = " + ViolationID;
            command = new MySqlCommand(com, dbl.connection);
            adapter = new MySqlDataAdapter();
            adapter.SelectCommand = command;
            command.ExecuteNonQuery();
            comboBox2_SelectionChanged(sender, null);
        }

        private void button2_Click(object sender, RoutedEventArgs e)
        {
            string[] array = comboBox2.SelectedValue.ToString().Split(' ');
            string[] arrays = {textBox1.Text, textBox2.Text };
            DBL dbl = new DBL();
            dbl.openConnection();
            string com = "SELECT uc.IdUser, uc.IdCar FROM userscars uc JOIN cars c ON c.IdCar = uc.IdCar JOIN users u ON " +
                "u.IdUser = uc.IdUser WHERE c.CarNumber = '" + comboBox.SelectedValue + "' AND u.Surname = '" + array[0] + 
                "' AND u.FirstName = '" + array[1] + "' AND u.MiddleName = '" + array[2] + "'";
            MySqlCommand command = new MySqlCommand(com, dbl.connection);
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            adapter.SelectCommand = command;
            DataTable table = new DataTable();
            adapter.Fill(table);
            int UserID = Convert.ToInt32(table.Rows[0]["IdUser"]);
            int CarID = Convert.ToInt32(table.Rows[0]["IdCar"]);
            dbl.closeConnection();
            dbl.openConnection();
            com = "SELECT IdViolation FROM violations WHERE Article = '" + arrays[0] + "' AND Paragraph = '" + arrays[1] + "'";
            command = new MySqlCommand(com, dbl.connection);
            adapter = new MySqlDataAdapter();
            adapter.SelectCommand = command;
            table = new DataTable();
            adapter.Fill(table);
            int ViolationId = Convert.ToInt32(table.Rows[0]["IdViolation"]);
            dbl.closeConnection();
            dbl.openConnection();
            com = "INSERT INTO records (IdUser, IdViolation, IsDeleted, IdCar) Values ('" + UserID + "', '" + ViolationId +
                "', 0, '" + CarID + "')";
            command = new MySqlCommand(com, dbl.connection);
            adapter = new MySqlDataAdapter();
            adapter.SelectCommand = command;
            command.ExecuteNonQuery();
            comboBox2_SelectionChanged(sender, null);
        }
    }
}
