import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class JobkoreaSuccess {
	public String requestJobkoreaSuccess(double grade,double toeic, double toeicSpeaking,double opic,double language,
			double certificate, double oversea, double intern, double award, double volunteer) {
        BufferedReader br = null;
        try{
        	String urlstr = String.format("http://54.235.0.24:1102/success?grade=%f&toeic=%f&toeicSpeaking=%f&opic=%f&language=%f&certificate=%f&oversea=%f&intern=%f&award=%f&volunteer=%f",
        			grade,toeic,toeicSpeaking,opic,language,certificate,oversea,intern,award,volunteer);
        	System.out.println(urlstr);
            URL url = new URL(urlstr);
            HttpURLConnection urlconnection = (HttpURLConnection) url.openConnection();
            urlconnection.setRequestMethod("GET");
            br = new BufferedReader(new InputStreamReader(urlconnection.getInputStream(),"UTF-8"));
            String result = "";
            String line;
            while((line = br.readLine()) != null) {
                result = result + line + "\n";
            }
            return result;
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
		return null;
	}
}
