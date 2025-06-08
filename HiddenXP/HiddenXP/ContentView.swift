import SwiftUI
import omi_lib

@Observable
class Model {
  private var isScanning = false
  
  func startScanning() {
    guard !isScanning else { return }
    isScanning = true
    lookForDevice()
  }
  
  private func lookForDevice() {
    OmiManager.startScan { device, error in
      // connect to first found omi device
      print("starting scan")
      if let device = device {
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
    OmiManager.getLiveAudio(device: device) { file_url in
      print("file_url: ", file_url?.absoluteString ?? "no url")
    }
  }
}

struct ContentView: View {
  @State private var model = Model()
  
  var body: some View {
    VStack {
      Image(systemName: "globe")
        .imageScale(.large)
        .foregroundStyle(.tint)
    }
    .padding()
    .onAppear {
      model.startScanning()
    }
  }
  
}

#Preview {
  ContentView()
}
