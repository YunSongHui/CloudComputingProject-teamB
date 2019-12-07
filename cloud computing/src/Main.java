public class Main {
    public static void main(String[] args) {
    	double grade = 0;
    	double toeic = 0;
    	double toeicSpeaking = 0;
    	double opic = 0;
    	double language = 0;
		double certificate = 0;
		double oversea = 0;
		double intern = 0;
		double award = 0;
		double volunteer = 0;
    	JobkoreaSuccess jks = new JobkoreaSuccess();
    	String result = jks.requestJobkoreaSuccess(grade, toeic, toeicSpeaking, opic, language, certificate, oversea, intern, award, volunteer);
    	System.out.println(result);
    }
}

