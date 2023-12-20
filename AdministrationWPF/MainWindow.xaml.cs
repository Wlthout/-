using System;
using System.Collections.Generic;
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
using System.Windows.Navigation;
using System.Windows.Shapes;
using MySql.Data.MySqlClient;

namespace AdministrationWPF
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            button.Background = new SolidColorBrush(Colors.White);
            ColorLogin();
            ColorPassword();
        }
        
        private void LoginText_GotFocus(object sender, RoutedEventArgs e)
        {
            if (loginText.Foreground is SolidColorBrush solidColorBrush)
            {
                if (solidColorBrush.Color == Colors.Gray && loginText.Text == "Username")
                {
                    loginText.Text = "";
                }
            }
            loginText.Foreground = new SolidColorBrush(Colors.Black);
            if (passwordText.Text == "")
            {
                passwordText.Text = "Password";
                passwordText.Foreground = new SolidColorBrush(Colors.Gray);
            }
        }
        private void PasswordText_GotFocus(object sender, RoutedEventArgs e)
        {
            if (passwordText.Foreground is SolidColorBrush solidColorBrush)
            {
                if (solidColorBrush.Color == Colors.Gray && passwordText.Text == "Password")
                {
                    passwordText.Text = "";
                }
            }
            passwordText.Foreground = new SolidColorBrush(Colors.Black);
            if (loginText.Text == "")
            {
                loginText.Text = "Username";
                loginText.Foreground = new SolidColorBrush(Colors.Gray);
            }
        }
        public void ColorLogin ()
        {
            loginText.Text = "Username";
            loginText.Foreground = new SolidColorBrush(Colors.Gray);
        }
        public void ColorPassword()
        {
            passwordText.Text = "Password";
            passwordText.Foreground = new SolidColorBrush(Colors.Gray);
        }
        private void button_Click(object sender, RoutedEventArgs e)
        {
            DBL.username = loginText.Text;
            DBL.password = passwordText.Text;
            OpenNewForm();
        }
        public void OpenNewForm()
        {
            DBL dbl = new DBL();
            if (dbl.openConnection())
            {
                Admin work = new Admin();
                work.Show();
                this.Hide();
                dbl.closeConnection();
            }
        }
    }
    public class DBL
    {
        public static string username;
        public static string password;
        public MySqlConnection connection = new MySqlConnection("server=192.168.100.61;port=3306;username=" 
            + username + ";password=" + password + ";database=recordingviolations");
        public bool openConnection()
        {
            try
            {
                if (connection.State == System.Data.ConnectionState.Closed)
                {
                    connection.Open();
                }
                return true;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Error", MessageBoxButton.OK);
                return false;
            }
        }
        public bool closeConnection()
        {
            if (connection.State == System.Data.ConnectionState.Open)
            {
                connection.Close();
            }
            return false;
        }
        public MySqlConnection GetConnection()
        {
            return connection;
        }
    }
}
