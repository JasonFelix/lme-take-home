# Jason Felix's LME Take Home



#### Instructions:
To install run:

```npm i```

To run the app on port ```3000``` run: 

```npm start```

To run tests run: 

```npm test```

---

#### How to use:

1. Set an area size. (You can drag the ```NumberInput``` component to change the value, similar to in Figma). **Remember to hit the Set Dimensions button.**

2. Set your robot's coordinates, orientation and instructions. You can either type (or copy) the instruction characters ('L', 'R', 'F') in the input field, or click the buttons. You can also delete instructions by either clicking the instruction in the list or backspacing in the field. Hit "Activate Robot" when you're ready to trek.

3. View your logs in the Robot Log.

   **You can reset the state via the Area tab**

---

#### Notes: 

* I decided not to set up a backend myself as ```create-react-app``` is simple and does everything I need it to. - I hope this keeps within the spirit of this assignment. 
* I am aware that the deprecated ```window#orientation``` method may name clash with the orientation variable. However it seems to just be vscode on my end playing up.
* I was originally considering a Movable abstract class or interface but decided against it to keep it simple.
* I prefer to use a mapped object instead of a switch to map the instructions to functions, in my opinion large switch statements are prone to bugs because it's very easy to miss a break statement. Also, although this needs to be extendable I think anything more complex for processing simple instructions would be overkill. If need be, extraction would be a fairly quick and simple task.
* Certain arrow functions I abbreviated the types to a letter for a example ```(c: Coordinates, o: Orientation) => ...```, it's just to save some screen space and hopefully the typing is verbose enough.
* I've implemented a [fail-fast](https://en.wikipedia.org/wiki/Fail-fast) approach. If the input is invalid (which should not be possible through the UI) the app throws and error straight away.
* I exprimented with displaying a grid for scents and last known locations, however the grid was too large and given the time finding a way to show a mini version didn't seem like a good idea.
* In the css I used a lot of hardcoded values. I should have used css variables in all places possible. - **I apologise for the state of the styling files.** 
* I decided against using ReactRouter as there didn't seem to be a need.
* Due to time constraints I did not make scents viewable.
* I used MobX as it's an easy to setup/read/follow way to create a reactive UI without the verbosity and boilerplate of Redux.
* Tested on OS is MacOS Big Sur 11.2 with both Chrome ```Version 94.0.4606.81 (Official Build) (x86_64)``` and Firefox ```90.0.2``` (and it seems to be working correctly).
* I wouldn't usually use snapshot tests for the UI in isolation. However due to running out of time I used them for some reliability. I believe applying test ids to components clicking through them and checking that the correct dom elements is more reliable.

