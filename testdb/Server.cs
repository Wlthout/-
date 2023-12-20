using dbl;
using System;
using System.IO;
using System.Net;
using System.Text;

namespace Back
{
    class HttpServer
    {
        static void Main()
        {
            string url = "http://172.20.10.3:8085/";
            HttpListener listener = new HttpListener();
            listener.Prefixes.Add(url);
            listener.Start();

            Console.WriteLine($"Сервер запущен по адресу {url}");
            DB dataBase = new DB();
            while (true)
            {
                HttpListenerContext context = listener.GetContext();
                HttpListenerRequest request = context.Request;
                HttpListenerResponse response = context.Response;

                // Разрешить CORS для всех запросов
                response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:5173");
                response.Headers.Add("Access-Control-Allow-Credentials", "true");
                response.Headers.Add("Access-Control-Allow-Methods", "POST, OPTIONS");
                response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Accept");
                response.Headers.Add("Access-Control-Max-Age", "86400");

                // Если это OPTIONS запрос, вернуть соответствующие заголовки
                if (request.HttpMethod == "OPTIONS")
                {
                    response.Headers.Add("Access-Control-Allow-Methods", "POST, OPTIONS");
                    response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Accept");
                    response.Headers.Add("Access-Control-Max-Age", "86400");
                    response.StatusCode = 200;
                    response.OutputStream.Close();
                    continue;
                }

                string responseData = "";

                using (Stream body = request.InputStream)
                {
                    using (StreamReader reader = new StreamReader(body, request.ContentEncoding))
                    {
                        string requestData = reader.ReadToEnd();
                        byte[] arr = Encoding.GetEncoding("windows-1251").GetBytes(requestData);
                        requestData = Encoding.UTF8.GetString(arr);

                        Console.WriteLine($"Получен POST-запрос: {requestData}");
                        responseData = dataBase.Work(requestData);
                    }
                }

                // Отправка ответа
                byte[] buffer = Encoding.UTF8.GetBytes(responseData);
                response.ContentLength64 = buffer.Length;
                response.OutputStream.Write(buffer, 0, buffer.Length);
                response.Close();
            }
        }
    }
}