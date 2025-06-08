import SwiftUI
import FirebaseCore
import omi_lib
import FirebaseAI

@Observable
class Model {
  private let llm: GenerativeModel
  var text = "initializing..."
  
  init() {
    FirebaseApp.configure()
    let ai = FirebaseAI.firebaseAI(backend: .googleAI())
    llm = ai.generativeModel(modelName: "gemini-2.0-flash")
    lookForDevice()
  }
  
  private func lookForDevice() {
    OmiManager.startScan { device, error in
      // connect to first found omi device
      print("starting scan")
      self.text = "connecting..."
      if let device = device {
        self.text = "Connected!"
        print("got device ", device)
        self.connectToOmiDevice(device: device)
        OmiManager.endScan()
      }
    }
  }
  
  private func lookForSpecificDevice(device_id: String) {
    OmiManager.startScan { device, error in
      // connect to first found omi device
      if let device = device, device.id == "some_device_id" {
        print("got device ", device)
        self.connectToOmiDevice(device: device)
        OmiManager.endScan()
      }
    }
  }
  
  private func connectToOmiDevice(device: Device) {
    OmiManager.connectToDevice(device: device)
    listenToLiveAudio(device: device)
    reconnectIfDisconnects()
  }
  
  private func reconnectIfDisconnects() {
    OmiManager.connectionUpdated { connected in
      if connected == false {
        self.lookForDevice()
      }
    }
  }
  
  private func listenToLiveTranscript(device: Device) {
    OmiManager.getLiveTranscription(device: device) { transcription in
      print("transcription:", transcription ?? "no transcription")
    }
  }
  
  private func listenToLiveAudio(device: Device) {
    OmiManager.getLiveAudio(device: device) { audioURL in
      self.text = ". . ."
      Task {
        do {
          
//          // Provide a prompt that contains text
//          let prompt = "Write a story about a magic backpack."
//          
//          // To generate text output, call generateContent with the text input
//          let response = try await self.llm.generateContent(prompt)
          
          // Provide the audio as `Data`
          guard let audioURL,
                let audioData = try? Data(contentsOf: audioURL) else {
            print("Error loading audio data.")
            return // Or handle the error appropriately
          }
          
          // Specify the appropriate audio MIME type
          let audio = InlineDataPart(data: audioData, mimeType: "audio/mpeg")
          
          
          // Provide a text prompt to include with the audio
          let prompt = "Transcribe what's said in this audio recording or if there is no audio just respond with ... (dots)"
          
          // To generate text output, call `generateContent` with the audio and text prompt
          let response = try await self.llm.generateContent(audio, prompt)
          if let text = response.text {
            self.text = text
          } else {
            self.text = "..."
          }
        } catch {
          print("Error: \(error)")
        }
      }
    }
  }
}

struct ContentView: View {
  @State private var model = Model()
  
  var body: some View {
    VStack {
      Text(model.text)
    }
    .padding()
  }
  
}

#Preview {
  ContentView()
}
