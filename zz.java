import java.util.*;

public class zz {
    public static void main(String[] args) {

        Scanner in = new Scanner(System.in);

        int det1 = 0;
        int det2 = 0;

        int n = in.nextInt();
        int m =in.nextInt();
        String a[] = new String[n];
        Set<String> det = new HashSet<>();

       int det3=0;

       int steps= (int) Math.floor(n/2.0);
       int reminder=n%2;
       steps=steps+reminder;
       if(steps%m!=0){
        det3=m-(steps%m);
       }
       

       int o=det3+steps;
       if (n==m) {
        System.out.println(n);
       }else{
        System.out.println(steps<m?-1:o);
       }
       
       

    }
}