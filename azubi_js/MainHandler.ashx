<%@ WebHandler Language = "C#" Class="ChatHandler" %>

using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Collections.Generic;
using System.Web.SessionState;
using Sage.Platform.Data;
using Sage.Platform.Application;
using Sage.Entity.Interfaces;
using Sage.Platform.Application;
using Sage.Platform;
using Sage.Platform.Orm.Interfaces;
using Sage.Platform.Scheduling;
using Newtonsoft.Json;

internal static class Extensions
{
    internal static string GetRequestParameter(this HttpContext context, string parameter)
    {
        return context.Request[parameter] ?? string.Empty;
    }
}

internal enum HttpMethod
{
    DELETE, GET, PATCH, POST, PUT
}

public class MainHandler : IHttpHandler, IRequiresSessionState
{
    private const string BASE_URL = "http://dev.jh-dev.bpacrm.local/SDATA/SLX/dynamic/-/questionAnswers";
    private const string CONTENT_TYPE = "application/json; charset=utf-8";

    // Required interface implementation
    public bool IsReusable { get { return true; } }

    /// <summary>
    /// Processes the incoming request.
    /// </summary>
    public void ProcessRequest(HttpContext context)
    {
        string answer = "";
        string url = BASE_URL + context.GetRequestParameter("token");

        switch (context.GetRequestParameter("action").ToLower())
        {
            default:
                string payload = JsonConvert.SerializeObject(
                    new
                    {
                        sender = context.GetRequestParameter("sender"),
                        content = context.GetRequestParameter("content"),
                        context = new
                        {
                            entityId = context.GetRequestParameter("entityId"),
                            entityName = context.GetRequestParameter("entityName"),
                        }
                    }
                );

                answer = DoRequest(url, HttpMethod.POST, payload);
                break;
        }

        context.Response.ContentType = CONTENT_TYPE;
        context.Response.Write(JsonConvert.SerializeObject(answer));
    }

    private static string DoRequest(string url, HttpMethod method, string payload = null)
    {
        try
        {
            var request = WebRequest.Create(url);
            request.Method = method.ToString();
            request.ContentType = CONTENT_TYPE;

            if (!string.IsNullOrEmpty(payload))
            {
                byte[] byteArray = Encoding.UTF8.GetBytes(payload);
                request.ContentLength = byteArray.Length;

                using (Stream dataStream = request.GetRequestStream())
                {
                    dataStream.Write(byteArray, 0, byteArray.Length);
                }
            }

            using (var response = request.GetResponse())
            {
                using (var reader = new StreamReader(response.GetResponseStream()))
                {
                    return reader.ReadToEnd();
                }
            }
        }
        catch (WebException webException)
        {
            using (var reader = new StreamReader(webException.Response.GetResponseStream()))
            {
                return reader.ReadToEnd();
            }
        }
        catch (Exception exception)
        {
            return "{ 'content' : '" + exception.Message + "' }";
        }
    }
}