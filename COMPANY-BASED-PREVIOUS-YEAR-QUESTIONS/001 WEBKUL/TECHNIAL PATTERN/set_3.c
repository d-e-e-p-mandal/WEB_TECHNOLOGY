/*
Input Value : Greater then Equal to 3 and Odd Number.
N = 3
  eeeeee
  e    e
  e    e
***    e
 *     e

N = 5
    eeeeeeee
    e      e
    e      e
    e      e
    e      e
*****      e
 ***       e
  *    

N = 7 
        N+3
      eeeeeeeeee
      e        e
      e        e
   N  e        e  N+2
      e        e
      e        e
  N   e        e
*******        e
 *****         e
  ***          
   *   
      
*/

#include <stdio.h>

void pattern(int n) {
    
    for(int i=0; i<n; i++) {
        for(int j=0; j<n-1; j++) printf(" ");
        
        for(int j=0; j<n+3; j++){
            if(i == 0 || j == 0 || j == n+2){
                printf("e");
            }
            else printf(" ");
        }
        printf("\n");
    }
    
    
    for(int i=0 ; i< (n+1)/2 ; i++) {
        for(int j=0; j<i; j++){
            printf(" ");
        }
        for(int j=0; j< n - 2*i; j++){
            printf("*");
        }
        for(int j=0; j<i; j++){
            printf(" ");
        }
        
        for(int j = 0; j<n+1; j++){
            printf(" ");
        }
        if(i == 0 || i == 1){
            printf("e");
        }
        printf("\n");
    }
}


int main() {

    int n;
    printf("Enter Value of N : ");
    scanf("%d", &n);
    if(n<3 || !(n&1)){
        printf("Wrong Input");
    }
    else pattern(n);

    return 0;
}