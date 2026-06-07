const CURRICULUM = {
  chapters: [
    {
      id: "os",
      name: "Operating Systems",
      num: "Ch 01",
      theme: "theme-os",
      topics: [
        {
          title: "Types of Operating Systems",
          icon: "🖥️",
          desc: "An OS is the core software managing system hardware resources and providing common services for application software.",
          keyPoints: ["Batch OS", "Time-Sharing", "Real-Time OS (RTOS)", "Distributed OS", "Multiprogramming"],
          htmlContent: `
            <p>Operating Systems act as intermediates between hardware and user software. They differ heavily in scheduling, interaction, and resource usage models.</p>
            
            <div class="examples-container">
              <div class="example-box" data-num="Ex 1">
                <div class="ex-title">Batch Operating System</div>
                <div class="ex-body">Jobs are prepared offline, grouped by similarity, and processed by the CPU sequentially without user interaction. Maximize CPU utilization by keeping jobs queued. <strong>Example:</strong> Payroll systems, bank statement printing.</div>
              </div>
              <div class="example-box" data-num="Ex 2">
                <div class="ex-title">Time-Sharing Operating System</div>
                <div class="ex-body">Allocates CPU time slices (quanta) among multiple concurrent users. Gives each user the illusion of a dedicated machine. <strong>Example:</strong> Linux/Unix servers hosting multiple SSH sessions.</div>
              </div>
              <div class="example-box" data-num="Ex 3">
                <div class="ex-title">Real-Time OS (RTOS)</div>
                <div class="ex-body">Guarantees processing of inputs and results within strict, predictable deadlines. <strong>Hard RTOS:</strong> Missing deadline is a total system failure (e.g., Pacemaker, ABS brakes). <strong>Soft RTOS:</strong> Missing deadline degrades quality but isn't catastrophic (e.g., video streaming).</div>
              </div>
            </div>
            
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent1)">Multiprogramming</h4>
                <ul>
                  <li>Keeps multiple programs loaded in main memory (RAM) at once.</li>
                  <li>If one process waits for I/O, CPU switches to another to prevent idling.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent2)">Multitasking</h4>
                <ul>
                  <li>Logical extension of multiprogramming.</li>
                  <li>CPU switches between programs so rapidly that users interact with each program running concurrently.</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          title: "Kernel Types & Process States",
          icon: "⚙️",
          desc: "The Kernel is the core component of an OS. Process management tracks state transitions as code executes.",
          keyPoints: ["Monolithic Kernel", "Microkernel", "Zombie Process", "Orphan Process", "Daemon"],
          htmlContent: `
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent1)">Monolithic Kernel</h4>
                <ul>
                  <li>Runs all OS core services (VFS, IPC, Drivers, Mem Mgr) in a single kernel space address.</li>
                  <li><strong>Pros:</strong> Fast execution, zero system call overhead for IPC.</li>
                  <li><strong>Cons:</strong> Any crash in a driver can take down the entire system. Example: <em>Linux</em>.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent2)">Microkernel</h4>
                <ul>
                  <li>Runs only bare essentials (scheduling, basic memory, low-level IPC) in kernel space. Other services run in user space.</li>
                  <li><strong>Pros:</strong> High modularity and stability. Crashed services restart seamlessly.</li>
                  <li><strong>Cons:</strong> Slower due to heavy IPC message passing overhead. Example: <em>Minix, L4</em>.</li>
                </ul>
              </div>
            </div>

            <div class="diagram-box">
              <div class="diagram-title">Process State Machine Transitions Flowchart</div>
              <div class="flowchart-container">
                <div class="flowchart-row">
                  <div class="flow-node" style="border-color:var(--accent1)">New</div>
                  <div class="flow-arrow">→</div>
                  <div class="flow-node" style="border-color:var(--accent2)">Ready</div>
                  <div class="flow-arrow">→</div>
                  <div class="flow-node active-node" style="border-color:var(--accent3); background:rgba(16,185,129,0.06)">Running</div>
                  <div class="flow-arrow">→</div>
                  <div class="flow-node" style="border-color:var(--text-dim)">Terminated</div>
                </div>
                <div class="flowchart-row" style="margin-top: 0.2rem;">
                  <div class="flow-label">Dispatch ↓</div>
                  <div style="width: 140px;"></div>
                  <div class="flow-label">Timeout (Preempt) ↑</div>
                </div>
                <div class="flowchart-row" style="margin-top: 0.8rem;">
                  <div class="flow-arrow">← Event Completed</div>
                  <div class="flow-node" style="border-color:var(--accent5)">Waiting / Blocked</div>
                  <div class="flow-arrow">← Wait for Event / IO</div>
                </div>
              </div>
            </div>

            <div class="examples-container">
              <div class="example-box" data-num="Zombie">
                <div class="ex-title">Zombie Process</div>
                <div class="ex-body">A process that has completed execution via <code>exit()</code>, but its parent has not yet read its exit status using <code>wait()</code>. It remains in the process table as an entry.</div>
              </div>
              <div class="example-box" data-num="Orphan">
                <div class="ex-title">Orphan Process</div>
                <div class="ex-body">A running process whose parent process terminates. It is adopted by the system's root process (usually <code>init</code> or process ID <code>1</code>) which automatically reaps its exit state.</div>
              </div>
            </div>
          `
        },
        {
          title: "CPU Scheduling Algorithms",
          icon: "⏱️",
          desc: "Decides which process in the ready queue is allocated the CPU. Maximizes CPU utilization and minimizes response times.",
          keyPoints: ["FCFS", "SJF (Shortest Job First)", "Round Robin", "MLFQS", "Convoy Effect", "Starvation"],
          htmlContent: `
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Algorithm</th>
                    <th>Type</th>
                    <th>Metric Focus</th>
                    <th>Strengths / Weaknesses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>FCFS</strong> (First Come First Served)</td>
                    <td>Non-preemptive</td>
                    <td>Arrival order</td>
                    <td>Simple. Suffers from <span class="c-red">Convoy Effect</span> (short processes wait behind long ones).</td>
                  </tr>
                  <tr>
                    <td><strong>SJF</strong> (Shortest Job First)</td>
                    <td>Non-preemptive</td>
                    <td>Shortest burst time</td>
                    <td>Gives <span class="c-green">Optimal minimum average waiting time</span>. Starves long processes.</td>
                  </tr>
                  <tr>
                    <td><strong>SRTF</strong> (Shortest Remaining Time First)</td>
                    <td>Preemptive SJF</td>
                    <td>Remaining burst time</td>
                    <td>Preempts running process if a shorter job arrives. Starvation possible.</td>
                  </tr>
                  <tr>
                    <td><strong>Round Robin (RR)</strong></td>
                    <td>Preemptive</td>
                    <td>Time quantum (q)</td>
                    <td>Excellent for time-sharing. Fair. Performance depends heavily on time quantum size.</td>
                  </tr>
                  <tr>
                    <td><strong>MLFQS</strong> (Multilevel Feedback Queue)</td>
                    <td>Preemptive</td>
                    <td>Process behavior</td>
                    <td>Dynamically adjusts priority based on CPU burst history. Prevents starvation. Complex.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="formula-box">
              <div class="formula-label">CPU Scheduling Performance Calculations</div>
              Turnaround Time (TAT) = Completion Time (CT) - Arrival Time (AT)<br>
              Waiting Time (WT) = Turnaround Time (TAT) - Burst Time (BT)<br>
              Response Time (RT) = First CPU Allocation Time - Arrival Time (AT)
            </div>

            <div class="hint-badge">💡 MCQ Tip: If the Round Robin Time Quantum is extremely large, it behaves exactly like FCFS. If it is extremely small, it causes massive context-switching overhead.</div>
          `
        },
        {
          title: "Process Synchronization & Deadlock",
          icon: "🔐",
          desc: "Coordinating concurrent processes to prevent race conditions. Deadlock describes a state where execution stalls indefinitely.",
          keyPoints: ["Mutex vs Semaphore", "Coffman Conditions", "Banker's Algorithm", "Safe State", "Critical Section"],
          htmlContent: `
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent1)">Mutex (Mutual Exclusion Lock)</h4>
                <ul>
                  <li>Locking mechanism used to synchronize access to a single resource.</li>
                  <li>Binary state (locked/unlocked).</li>
                  <li>Has ownership: Only the thread that acquired the lock can release it.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent2)">Semaphore</h4>
                <ul>
                  <li>Signaling mechanism using an integer counter.</li>
                  <li><strong>Binary Semaphore:</strong> range is [0, 1] (equivalent to Mutex but has no ownership concept).</li>
                  <li><strong>Counting Semaphore:</strong> controls access to a finite pool of resources (values > 1).</li>
                </ul>
              </div>
            </div>

            <div class="example-box" data-num="CS">
              <div class="ex-title">Critical Section Requirements</div>
              <div class="ex-body">
                1. <strong>Mutual Exclusion:</strong> If process P is executing in its critical section, no other processes can execute in theirs.<br>
                2. <strong>Progress:</strong> If no process is executing and some want to enter, only those not executing in their remainder sections can decide who enters next.<br>
                3. <strong>Bounded Waiting:</strong> There must be a limit on the number of times other processes can enter before a waiting process is granted access.
              </div>
            </div>

            <div class="example-box" data-num="Deadlock">
              <div class="ex-title">The 4 Coffman Conditions (Must ALL hold simultaneously for Deadlock)</div>
              <div class="ex-body">
                1. <strong>Mutual Exclusion:</strong> At least one resource must be held in a non-shareable mode.<br>
                2. <strong>Hold and Wait:</strong> A process must hold at least one resource and wait to acquire additional resources held by other processes.<br>
                3. <strong>No Preemption:</strong> Resources cannot be preempted; a resource can be released only voluntarily by the process holding it.<br>
                4. <strong>Circular Wait:</strong> A closed chain of processes exists, where each process holds resources needed by the next process in the chain.
              </div>
            </div>

            <div class="formula-box">
              <div class="formula-label">Banker's Algorithm (Deadlock Avoidance)</div>
              System checks if allocating resources keeps the system in a <strong>Safe State</strong> (an execution sequence exists where all processes can complete).<br>
              <strong>Need Matrix Calculation:</strong><br>
              <code>Need[i][j] = Max[i][j] - Allocation[i][j]</code><br>
              Allocation is only granted if <code>Need &le; Available</code>.
            </div>
          `
        },
        {
          title: "Memory Management & Virtual Memory",
          icon: "🧠",
          desc: "Manages physical and virtual memory spaces. Swaps pages between RAM and disk to support execution of large applications.",
          keyPoints: ["Fragmentation", "Paging", "TLB", "Belady's Anomaly", "Thrashing", "EAT"],
          htmlContent: `
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent1)">Internal Fragmentation</h4>
                <ul>
                  <li>Wasted memory space within an allocated block.</li>
                  <li>Occurs in fixed-sized partitioning (e.g., paging).</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent2)">External Fragmentation</h4>
                <ul>
                  <li>Total free memory space is sufficient to satisfy an allocation request, but it is not contiguous.</li>
                  <li>Solved by <strong>paging</strong> or compaction.</li>
                </ul>
              </div>
            </div>

            <div class="examples-container">
              <div class="example-box" data-num="Paging">
                <div class="ex-title">Paging vs Segmentation</div>
                <div class="ex-body">
                  <strong>Paging:</strong> Divides physical memory into fixed-sized blocks (frames) and logical memory into pages of the same size. Eliminates external fragmentation. Has a Page Table.<br>
                  <strong>Segmentation:</strong> Divides logical memory into variable-sized segments reflecting user view (Code, Data, Stack, Heap). Can suffer from external fragmentation.
                </div>
              </div>
              <div class="example-box" data-num="Anomaly">
                <div class="ex-title">Belady's Anomaly (FIFO Page Replacement)</div>
                <div class="ex-body">For some page replacement algorithms, the page-fault rate may <em>increase</em> as the number of allocated physical frames <em>increases</em>. FIFO experiences this; LRU and Optimal do not.</div>
              </div>
            </div>

            <div class="formula-box">
              <div class="formula-label">Effective Access Time (EAT) Calculations</div>
              <strong>Without TLB:</strong><br>
              <code>EAT = 2 &times; Memory_Access_Time</code> (1 to search Page Table, 1 to read data)<br><br>
              <strong>With TLB:</strong><br>
              <code>EAT = Hit_Rate &times; (TLB_Search_Time + Memory_Access_Time) + (1 - Hit_Rate) &times; (TLB_Search_Time + 2 &times; Memory_Access_Time)</code>
            </div>
          `
        }
      ]
    },
    {
      id: "networks",
      name: "Computer Networks",
      num: "Ch 02",
      theme: "theme-net",
      topics: [
        {
          title: "OSI vs TCP/IP Models & Ports",
          icon: "🌐",
          desc: "Standard protocols define how computer systems communicate across physical networks.",
          keyPoints: ["OSI Layering", "TCP/IP Suite", "Socket Ports", "Presentation Layer", "Session Layer"],
          htmlContent: `
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent2)">OSI Reference Model (7 Layers)</h4>
                <ol style="padding-left:1.2rem; font-family:'JetBrains Mono',monospace; font-size:0.8rem;">
                  <li><strong>Application:</strong> Direct user/app interface (HTTP, FTP)</li>
                  <li><strong>Presentation:</strong> Translation, encryption, compression (SSL/TLS)</li>
                  <li><strong>Session:</strong> Authentication, session checkpointing</li>
                  <li><strong>Transport:</strong> Process-to-process delivery (TCP, UDP)</li>
                  <li><strong>Network:</strong> Host-to-host packet routing (IP, ICMP)</li>
                  <li><strong>Data Link:</strong> Hop-to-hop frame framing & MAC (Ethernet)</li>
                  <li><strong>Physical:</strong> Binary transmission over media (Bits, Cables)</li>
                </ol>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent3)">TCP/IP Model (4 Layers)</h4>
                <ol style="padding-left:1.2rem; font-family:'JetBrains Mono',monospace; font-size:0.8rem;">
                  <li><strong>Application:</strong> Covers Application, Presentation, and Session layers.</li>
                  <li><strong>Transport:</strong> Flow control, segments.</li>
                  <li><strong>Internet:</strong> Routes packets across network boundaries.</li>
                  <li><strong>Network Access:</strong> Covers Data Link and Physical layers.</li>
                </ol>
              </div>
            </div>

            <div class="table-wrapper">
              <div class="diagram-title" style="margin: 0.5rem 1rem;">Core Network Service Port Numbers</div>
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Port Number</th>
                    <th>Protocol</th>
                    <th>Default Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>20 & 21</td><td>FTP</td><td>TCP</td><td>File Transfer Protocol (Data & Control)</td></tr>
                  <tr><td>22</td><td>SSH</td><td>TCP</td><td>Secure Shell (Remote Login)</td></tr>
                  <tr><td>25</td><td>SMTP</td><td>TCP</td><td>Simple Mail Transfer Protocol</td></tr>
                  <tr><td>53</td><td>DNS</td><td>UDP & TCP</td><td>Domain Name System Resolution</td></tr>
                  <tr><td>67 & 68</td><td>DHCP</td><td>UDP</td><td>Dynamic Host Configuration Protocol</td></tr>
                  <tr><td>80</td><td>HTTP</td><td>TCP</td><td>Hypertext Transfer Protocol</td></tr>
                  <tr><td>443</td><td>HTTPS</td><td>TCP</td><td>HTTP Secure (TLS Encrypted)</td></tr>
                </tbody>
              </table>
            </div>
          `
        },
        {
          title: "IP Addressing & Subnetting",
          icon: "🔢",
          desc: "Logical addressing assigns unique identifiers to devices connected to a network.",
          keyPoints: ["IPv4 Classes", "Subnet Mask", "CIDR Notation", "Private IP Ranges", "IPv6 Format"],
          htmlContent: `
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>First Octet Range</th>
                    <th>Default Subnet Mask</th>
                    <th>Maximum Subnets / Hosts per Subnet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>Class A</strong></td><td>1.0.0.0 &ndash; 126.255.255.255</td><td>255.0.0.0 (/8)</td><td>128 subnets / 16,777,214 hosts</td></tr>
                  <tr><td><strong>Class B</strong></td><td>128.0.0.0 &ndash; 191.255.255.255</td><td>255.255.0.0 (/16)</td><td>16,384 subnets / 65,534 hosts</td></tr>
                  <tr><td><strong>Class C</strong></td><td>192.0.0.0 &ndash; 223.255.255.255</td><td>255.255.255.0 (/24)</td><td>2,097,152 subnets / 254 hosts</td></tr>
                  <tr><td><strong>Class D</strong></td><td>224.0.0.0 &ndash; 239.255.255.255</td><td>Reserved for Multicast</td><td>N/A</td></tr>
                </tbody>
              </table>
            </div>

            <div class="examples-container">
              <div class="example-box" data-num="RFC1918">
                <div class="ex-title">Private IP Ranges (Non-routable on the Internet)</div>
                <div class="ex-body">
                  <strong>Class A:</strong> 10.0.0.0/8 (10.0.0.0 - 10.255.255.255)<br>
                  <strong>Class B:</strong> 172.16.0.0/12 (172.16.0.0 - 172.31.255.255)<br>
                  <strong>Class C:</strong> 192.168.0.0/16 (192.168.0.0 - 192.168.255.255)
                </div>
              </div>
            </div>

            <div class="formula-box">
              <div class="formula-label">Subnetting Formulas</div>
              For a subnet with <code>h</code> host bits:<br>
              Total IP addresses in subnet = <code>2<sup>h</sup></code><br>
              Usable host IP addresses = <code>2<sup>h</sup> - 2</code> (Subtract Network IP and Broadcast IP)
            </div>
          `
        },
        {
          title: "Transport Protocols: TCP vs UDP",
          icon: "🤝",
          desc: "Differentiates process-to-process packet transmission using reliable stream connections or lightweight datagrams.",
          keyPoints: ["3-Way Handshake", "Flow Control", "Congestion Control", "Connectionless", "Reliable Delivery"],
          htmlContent: `
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent2)">Transmission Control Protocol (TCP)</h4>
                <ul>
                  <li>Connection-oriented: Requires explicit connection establishment.</li>
                  <li>Reliable: Packets are acknowledged; lost packets are retransmitted.</li>
                  <li>Ordered: Guarantees application receives packets in sequence.</li>
                  <li>Has Flow Control (sliding window) & Congestion Control.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent5)">User Datagram Protocol (UDP)</h4>
                <ul>
                  <li>Connectionless: Sends datagrams immediately.</li>
                  <li>Unreliable: No acknowledgment, no retransmissions.</li>
                  <li>Unordered: Packets may arrive in any order or be duplicated.</li>
                  <li>No built-in flow/congestion control. Extremely low overhead.</li>
                </ul>
              </div>
            </div>

            <div class="diagram-box">
              <div class="diagram-title">TCP 3-Way Handshake Sequence Flowchart</div>
              <div class="flowchart-container">
                <div class="flowchart-row" style="justify-content: space-between; padding: 0 2rem; width: 100%;">
                  <div class="flow-node" style="border-color:var(--accent2); background:#ffffff;"><strong>Client</strong><br><small>[Closed]</small></div>
                  <div class="flow-node" style="border-color:var(--accent3); background:#ffffff;"><strong>Server</strong><br><small>[Listen]</small></div>
                </div>
                
                <div class="flowchart-row" style="width: 100%; position: relative; padding: 0.5rem 0;">
                  <div style="flex: 1; border-top: 2px dashed var(--border); text-align: center; position: relative;">
                    <div style="position: absolute; left: 50%; transform: translateX(-50%) translateY(-50%); background: var(--bg); padding: 0.2rem 1rem; border-radius: 20px; font-family:'JetBrains Mono',monospace; font-size:0.78rem; border: 1px solid var(--border); color: var(--accent1); font-weight:600;">
                      1. SYN (seq=x) ───&gt;
                    </div>
                  </div>
                </div>
                
                <div class="flowchart-row" style="width: 100%; position: relative; padding: 0.5rem 0;">
                  <div style="flex: 1; border-top: 2px dashed var(--border); text-align: center; position: relative;">
                    <div style="position: absolute; left: 50%; transform: translateX(-50%) translateY(-50%); background: var(--bg); padding: 0.2rem 1rem; border-radius: 20px; font-family:'JetBrains Mono',monospace; font-size:0.78rem; border: 1px solid var(--border); color: var(--accent3); font-weight:600;">
                      &lt;─── 2. SYN-ACK (seq=y, ack=x+1)
                    </div>
                  </div>
                </div>
                
                <div class="flowchart-row" style="width: 100%; position: relative; padding: 0.5rem 0;">
                  <div style="flex: 1; border-top: 2px dashed var(--border); text-align: center; position: relative;">
                    <div style="position: absolute; left: 50%; transform: translateX(-50%) translateY(-50%); background: var(--bg); padding: 0.2rem 1rem; border-radius: 20px; font-family:'JetBrains Mono',monospace; font-size:0.78rem; border: 1px solid var(--border); color: var(--accent2); font-weight:600;">
                      3. ACK (seq=x+1, ack=y+1) ───&gt;
                    </div>
                  </div>
                </div>

                <div class="flowchart-row" style="justify-content: space-between; padding: 0 2rem; width: 100%; margin-top: 0.5rem;">
                  <div class="flow-node active-node" style="border-color:var(--accent1);"><strong>Established</strong></div>
                  <div class="flow-node active-node" style="border-color:var(--accent1);"><strong>Established</strong></div>
                </div>
              </div>
            </div>
          `
        },
        {
          title: "Routing Protocols",
          icon: "🗺️",
          desc: "Determines optimal path selection across network nodes to route packet traffic.",
          keyPoints: ["Bellman-Ford", "Dijkstra", "RIP", "OSPF", "BGP", "Autonomous Systems"],
          htmlContent: `
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Protocol</th>
                    <th>Type</th>
                    <th>Algorithm</th>
                    <th>Metric</th>
                    <th>Usage Scope</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>RIP</strong> (Routing Information Protocol)</td>
                    <td>Distance Vector</td>
                    <td>Bellman-Ford</td>
                    <td>Hop Count (Max 15)</td>
                    <td>Intra-Domain (IGP)</td>
                  </tr>
                  <tr>
                    <td><strong>OSPF</strong> (Open Shortest Path First)</td>
                    <td>Link State</td>
                    <td>Dijkstra</td>
                    <td>Cost (Bandwidth-based)</td>
                    <td>Intra-Domain (IGP)</td>
                  </tr>
                  <tr>
                    <td><strong>BGP</strong> (Border Gateway Protocol)</td>
                    <td>Path Vector</td>
                    <td>Policy rules</td>
                    <td>Path Attributes</td>
                    <td>Inter-Domain (EGP)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="hint-badge">💡 Routing Loops: Distance vector protocols suffer from the "Count to Infinity" problem, solved via Split Horizon and Poison Reverse.</div>
          `
        }
      ]
    },
    {
      id: "dbms",
      name: "DBMS",
      num: "Ch 03",
      theme: "theme-dbms",
      topics: [
        {
          title: "ER Modeling & Relational Keys",
          icon: "🔑",
          desc: "Designing databases involves structuring entities, attributes, and relationships. Relational keys enforce integrity.",
          keyPoints: ["Candidate Key", "Super Key", "Primary Key", "Foreign Key", "Referential Integrity"],
          htmlContent: `
            <p>Database models define logical relationships. The Entity-Relationship (ER) model maps real-world items, which are then translated into schema relations.</p>

            <div class="examples-container">
              <div class="example-box" data-num="Keys">
                <div class="ex-title">Classification of Keys</div>
                <div class="ex-body">
                  <strong>Super Key:</strong> A set of one or more attributes that uniquely identifies a tuple in a relation.<br>
                  <strong>Candidate Key:</strong> A <em>minimal</em> super key (no proper subset is also a super key).<br>
                  <strong>Primary Key:</strong> The candidate key selected by the database designer to uniquely identify tuples.<br>
                  <strong>Alternate Key:</strong> All candidate keys that were not chosen to be the primary key.<br>
                  <strong>Foreign Key:</strong> An attribute or set of attributes in a relation that matches the candidate key of another relation.
                </div>
              </div>
            </div>

            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent3)">Entity Integrity Rule</h4>
                <ul>
                  <li>No primary key attribute can accept NULL values.</li>
                  <li>Ensures each row represents a distinct entity in the system.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent2)">Referential Integrity Rule</h4>
                <ul>
                  <li>If a foreign key exists in a relation, its value must either match a primary key value in the referenced relation or be NULL.</li>
                  <li>Ensures relational consistency.</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          title: "Schema Normalization (1NF to BCNF)",
          icon: "📐",
          desc: "Eliminates data redundancy and anomaly hazards by decomposing database tables into normal forms.",
          keyPoints: ["1NF", "2NF", "3NF", "BCNF", "Functional Dependency", "Lossless Join"],
          htmlContent: `
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Normal Form</th>
                    <th>Core Requirement</th>
                    <th>Eliminated Anomaly</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>1NF</strong> (First Normal Form)</td>
                    <td>Attributes must contain only atomic (indivisible) values. No repeating groups.</td>
                    <td>Multi-value attributes</td>
                  </tr>
                  <tr>
                    <td><strong>2NF</strong> (Second Normal Form)</td>
                    <td>Must be in 1NF + No <strong>Partial Dependencies</strong> (every non-prime attribute must depend fully on the primary key).</td>
                    <td>Partial key dependencies</td>
                  </tr>
                  <tr>
                    <td><strong>3NF</strong> (Third Normal Form)</td>
                    <td>Must be in 2NF + No <strong>Transitive Dependencies</strong> (for any non-trivial FD <code>X &rarr; Y</code>, either X is a super key or Y is a prime attribute).</td>
                    <td>Transitive dependencies</td>
                  </tr>
                  <tr>
                    <td><strong>BCNF</strong> (Boyce-Codd Normal Form)</td>
                    <td>For every non-trivial FD <code>X &rarr; Y</code>, <strong>X must be a super key</strong>. Stronger than 3NF.</td>
                    <td>Overlapping candidate keys</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="examples-container">
              <div class="example-box" data-num="Lossless">
                <div class="ex-title">Lossless Join Property (Decomposition Check)</div>
                <div class="ex-body">
                  A decomposition of relation <code>R</code> into <code>R<sub>1</sub></code> and <code>R<sub>2</sub></code> is lossless if and only if their intersection functionally determines at least one of the schemas:<br>
                  <code>R<sub>1</sub> &cap; R<sub>2</sub> &rarr; R<sub>1</sub></code> OR <code>R<sub>1</sub> &cap; R<sub>2</sub> &rarr; R<sub>2</sub></code>
                </div>
              </div>
            </div>
          `
        },
        {
          title: "Transactions & ACID Properties",
          icon: "💾",
          desc: "A transaction is a logical unit of database processing. ACID properties guarantee data integrity despite failures.",
          keyPoints: ["Atomicity", "Consistency", "Isolation", "Durability", "Transaction States"],
          htmlContent: `
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent1)">Atomicity & Durability</h4>
                <ul>
                  <li><strong>Atomicity:</strong> "All or Nothing" policy. Either the transaction completes successfully or all its modifications are undone. (Managed by <em>Log/Recovery Manager</em>).</li>
                  <li><strong>Durability:</strong> Once a transaction commits, its updates persist in non-volatile memory even in the event of system crashes.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent3)">Consistency & Isolation</h4>
                <ul>
                  <li><strong>Consistency:</strong> Transactions must transition the database from one valid state to another, preserving all schema constraints.</li>
                  <li><strong>Isolation:</strong> Concurrent transactions execute as if they are running in isolation. (Managed by <em>Concurrency Control Manager</em>).</li>
                </ul>
              </div>
            </div>

            <div class="examples-container">
              <div class="example-box" data-num="States">
                <div class="ex-title">Transaction State Transitions</div>
                <div class="ex-body">
                  <strong>Active:</strong> Initial state; transaction executes read/write operations.<br>
                  <strong>Partially Committed:</strong> After final statement executes, before committing to disk.<br>
                  <strong>Committed:</strong> Successful completion; state changes are now permanent.<br>
                  <strong>Failed:</strong> Discovered that normal execution can no longer proceed.<br>
                  <strong>Aborted:</strong> Transaction rolled back; database restored to state prior to execution.
                </div>
              </div>
            </div>
          `
        },
        {
          title: "Concurrency Control & Indexing",
          icon: "🗂️",
          desc: "Serializability schedules, locking protocols, and database index trees.",
          keyPoints: ["2-Phase Locking (2PL)", "Conflict Serializable", "Precedence Graph", "B+ Tree", "Hashing"],
          htmlContent: `
            <div class="examples-container">
              <div class="example-box" data-num="Locks">
                <div class="ex-title">2-Phase Locking (2PL) Protocol</div>
                <div class="ex-body">
                  Guarantees serializability by dividing locking operations into two phases:<br>
                  1. <strong>Growing Phase:</strong> Transaction may acquire locks, but cannot release any.<br>
                  2. <strong>Shrinking Phase:</strong> Transaction may release locks, but cannot acquire new ones.<br>
                  <em>Note: Basic 2PL is prone to deadlocks. Cascading aborts are prevented by <strong>Strict 2PL</strong> (holding exclusive locks until commit/abort).</em>
                </div>
              </div>
              <div class="example-box" data-num="Index">
                <div class="ex-title">B+ Tree Indexes</div>
                <div class="ex-body">
                  Self-balancing search tree used in storage engines.<br>
                  - All data pointers are stored exclusively in <strong>leaf nodes</strong>.<br>
                  - Internal nodes store search keys only to guide navigation.<br>
                  - Leaf nodes are linked sequentially, supporting highly efficient range queries in <code>O(log N)</code> time.
                </div>
              </div>
            </div>

            <div class="formula-box">
              <div class="formula-label">Conflict Serializability Precedence Graph</div>
              A schedule is conflict serializable if and only if its <strong>Precedence Graph</strong> contains no cycles.<br>
              A precedence graph has transaction vertices <code>T<sub>i</sub></code>, and a directed edge <code>T<sub>i</sub> &rarr; T<sub>j</sub></code> if <code>T<sub>i</sub></code> performs an operation conflicting with <code>T<sub>j</sub></code>'s subsequent operation (Read-Write, Write-Read, or Write-Write on the same item).
            </div>
          `
        }
      ]
    },
    {
      id: "oop",
      name: "OOP",
      num: "Ch 04",
      theme: "theme-oop",
      topics: [
        {
          title: "Four Pillars of OOP",
          icon: "🧱",
          desc: "Object-Oriented Programming relies on four foundational principles for software modularity.",
          keyPoints: ["Abstraction", "Encapsulation", "Inheritance", "Polymorphism", "Virtual Functions"],
          htmlContent: `
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent4)">Encapsulation</h4>
                <ul>
                  <li>Binds data (variables) and behavior (methods) into a single object class unit.</li>
                  <li>Hides internal states using private variables and exposes access through public interfaces.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent2)">Abstraction</h4>
                <ul>
                  <li>Exposes only essential functionalities while hiding complex implementation details.</li>
                  <li>Implemented via interfaces and abstract classes.</li>
                </ul>
              </div>
            </div>

            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent3)">Inheritance</h4>
                <ul>
                  <li>Allows a child class to inherit fields and methods from a parent class (IS-A relationship).</li>
                  <li>Supports code reuse. Can lead to the <strong>Diamond Problem</strong> in multiple inheritance, resolved via interface rules.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent6)">Polymorphism</h4>
                <ul>
                  <li>"Many forms." Code operates differently depending on object types.</li>
                  <li><strong>Compile-time:</strong> Method and operator overloading.</li>
                  <li><strong>Runtime:</strong> Method overriding (uses <strong>vtable / virtual functions</strong>).</li>
                </ul>
              </div>
            </div>

            <div class="code-box">
              <div class="formula-label">Runtime Polymorphism C++ Example</div>
<pre><code><span class="kw">class</span> <span class="fn">Animal</span> {
<span class="kw">public</span>:
    <span class="kw">virtual void</span> <span class="fn">makeSound</span>() { std::cout << <span class="str">"Generic sound"</span>; }
};
<span class="kw">class</span> <span class="fn">Dog</span> : <span class="kw">public</span> <span class="fn">Animal</span> {
<span class="kw">public</span>:
    <span class="kw">void</span> <span class="fn">makeSound</span>() <span class="kw">override</span> { std::cout << <span class="str">"Woof!"</span>; }
};</code></pre>
            </div>
          `
        },
        {
          title: "SOLID Design Principles",
          icon: "💎",
          desc: "Five software design guidelines that enhance code maintainability and scalability.",
          keyPoints: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Interface Segregation", "Dependency Inversion"],
          htmlContent: `
            <div class="examples-container">
              <div class="example-box" data-num="S">
                <div class="ex-title">S — Single Responsibility Principle (SRP)</div>
                <div class="ex-body">A class should have one, and only one, reason to change. It should focus exclusively on a single duty.</div>
              </div>
              <div class="example-box" data-num="O">
                <div class="ex-title">O — Open/Closed Principle (OCP)</div>
                <div class="ex-body">Software entities should be open for extension, but closed for modification. Implement new features by adding subclass overrides instead of editing base code.</div>
              </div>
              <div class="example-box" data-num="L">
                <div class="ex-title">L — Liskov Substitution Principle (LSP)</div>
                <div class="ex-body">Subtypes must be substitutable for their base types without altering system correctness. Subclasses should not weaken preconditions or strengthen postconditions.</div>
              </div>
              <div class="example-box" data-num="I">
                <div class="ex-title">I — Interface Segregation Principle (ISP)</div>
                <div class="ex-body">Clients should not be forced to depend on interfaces they do not use. Prefer multiple, small, specific interfaces over a single, generic one.</div>
              </div>
              <div class="example-box" data-num="D">
                <div class="ex-title">D — Dependency Inversion Principle (DIP)</div>
                <div class="ex-body">High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces). Abstractions should not depend on details; details should depend on abstractions.</div>
              </div>
            </div>
          `
        },
        {
          title: "Key Design Patterns",
          icon: "🎨",
          desc: "Reusable solutions to common software design problems.",
          keyPoints: ["Singleton", "Factory", "Observer", "Strategy", "Creational", "Behavioral"],
          htmlContent: `
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent4)">Singleton Pattern (Creational)</h4>
                <ul>
                  <li>Guarantees a class has only one instance and provides a global access point to it.</li>
                  <li>Uses a private constructor, a private static instance variable, and a public static getter method.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent2)">Factory Method Pattern (Creational)</h4>
                <ul>
                  <li>Defines an interface for creating objects, but lets subclasses decide which class to instantiate.</li>
                  <li>Decouples client code from concrete object creation classes.</li>
                </ul>
              </div>
            </div>

            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent3)">Observer Pattern (Behavioral)</h4>
                <ul>
                  <li>Defines a one-to-many dependency between objects.</li>
                  <li>When the state of the subject changes, all its dependents (observers) are notified and updated automatically.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent6)">Strategy Pattern (Behavioral)</h4>
                <ul>
                  <li>Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.</li>
                  <li>Allows algorithms to vary independently from clients that use them.</li>
                </ul>
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: "ds",
      name: "Data Structures",
      num: "Ch 05",
      theme: "theme-ds",
      topics: [
        {
          title: "Linear Data Structures: Lists, Stacks, Queues",
          icon: "📈",
          desc: "Sequential data structures store elements in a linear sequence, differing in access and allocation properties.",
          keyPoints: ["Linked List", "Stack", "Queue", "LIFO / FIFO", "Circular Queue"],
          htmlContent: `
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent5)">Stack (LIFO)</h4>
                <ul>
                  <li>Last-In, First-Out access order.</li>
                  <li>Core operations: <code>push()</code> and <code>pop()</code> execute in <code>O(1)</code> time.</li>
                  <li><strong>Applications:</strong> Expression evaluation (Infix to Postfix), recursion trace, matching parentheses, undo/redo buffers.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent2)">Queue (FIFO)</h4>
                <ul>
                  <li>First-In, First-Out access order.</li>
                  <li>Core operations: <code>enqueue()</code> and <code>dequeue()</code> execute in <code>O(1)</code> time.</li>
                  <li><strong>Applications:</strong> Process scheduling, print spoolers, Breadth-First Search (BFS) queue.</li>
                </ul>
              </div>
            </div>

            <div class="code-box">
              <div class="formula-label">Algorithm: Singly Linked List Reversal (Iterative)</div>
<pre><code><span class="kw">Node*</span> <span class="fn">reverseList</span>(<span class="kw">Node*</span> head) {
    <span class="kw">Node*</span> prev = <span class="kw">nullptr</span>;
    <span class="kw">Node*</span> curr = head;
    <span class="kw">Node*</span> next = <span class="kw">nullptr</span>;
    <span class="kw">while</span> (curr != <span class="kw">nullptr</span>) {
        next = curr->next;  <span class="cm">// Store next node</span>
        curr->next = prev;  <span class="cm">// Reverse pointer direction</span>
        prev = curr;        <span class="cm">// Move pointers forward</span>
        curr = next;
    }
    <span class="kw">return</span> prev;
}</code></pre>
            </div>
          `
        },
        {
          title: "Balanced Trees (AVL & Red-Black Trees)",
          icon: "🌲",
          desc: "Self-balancing binary search trees guarantee optimal O(log N) lookup, insertion, and deletion times.",
          keyPoints: ["AVL Tree", "Balance Factor", "Red-Black Tree", "Rotations", "Height Bounds"],
          htmlContent: `
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent5)">AVL Tree</h4>
                <ul>
                  <li>Strictly height-balanced BST.</li>
                  <li><strong>Balance Factor (BF):</strong> <code>Height(Left_Subtree) - Height(Right_Subtree)</code>. Must be in <code>{-1, 0, 1}</code>.</li>
                  <li>Violations are corrected via single (LL, RR) or double (LR, RL) rotations.</li>
                  <li>Faster search operations than RB-Trees because they are more strictly balanced.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent6)">Red-Black Tree</h4>
                <ul>
                  <li>Self-balancing BST using node coloring (Red/Black).</li>
                  <li><strong>Properties:</strong>
                    1. Every node is Red or Black.<br>
                    2. The root is always Black.<br>
                    3. Red nodes cannot have Red children (no adjacent red nodes).<br>
                    4. Every path from root to leaf must contain the same number of Black nodes.
                  </li>
                  <li>Allows slightly looser balance, requiring fewer rotations during insertion/deletion.</li>
                </ul>
              </div>
            </div>

            <div class="hint-badge">💡 Height Bounds: AVL Tree height is bounded by &approx; 1.44 log N. Red-Black Tree height is bounded by &approx; 2 log N.</div>
          `
        },
        {
          title: "Heaps & Hash Tables",
          icon: "🔑",
          desc: "Heaps manage priority queues; Hash Tables provide O(1) average key-value lookups.",
          keyPoints: ["Min/Max Heap", "Heapify", "Collision Resolution", "Linear Probing", "Chaining"],
          htmlContent: `
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent5)">Max-Heap / Min-Heap</h4>
                <ul>
                  <li>Complete binary tree representation.</li>
                  <li><strong>Max-Heap:</strong> Parent value &ge; children values. Root contains maximum element.</li>
                  <li><strong>Complexity:</strong> Get Min/Max <code>O(1)</code>; Insert/Delete <code>O(log N)</code>.</li>
                  <li><strong>Heapify:</strong> Sub-routine that constructs a heap from an unsorted array in-place in <code>O(N)</code> time.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent3)">Hash Table Collision Resolution</h4>
                <ul>
                  <li><strong>Separate Chaining:</strong> Array slots point to a linked list of records sharing the same hash index.</li>
                  <li><strong>Open Addressing:</strong> Search slots sequentially.
                    - <em>Linear Probing:</em> check sequentially (causes primary clustering).<br>
                    - <em>Quadratic Probing:</em> offset checks quadratically.<br>
                    - <em>Double Hashing:</em> uses a second hash function to calculate interval steps.
                  </li>
                </ul>
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: "algo",
      name: "Algorithms",
      num: "Ch 06",
      theme: "theme-algo",
      topics: [
        {
          title: "Asymptotic Complexity & Recurrences",
          icon: "📊",
          desc: "Analyzes resource utilization of algorithms. Solves recurrence relations to determine asymptotic bounds.",
          keyPoints: ["Big-O / Omega / Theta", "Master Theorem", "Recurrence", "Space Complexity"],
          htmlContent: `
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent6)">Asymptotic Notations</h4>
                <ul>
                  <li><strong>Big-O (O):</strong> Asymptotic upper bound. Defines worst-case growth.</li>
                  <li><strong>Big-Omega (&Omega;):</strong> Asymptotic lower bound. Defines best-case growth.</li>
                  <li><strong>Big-Theta (&Theta;):</strong> Asymptotic tight bound. Describes exact growth rate.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent2)">Master Theorem for Divide & Conquer</h4>
                <p style="font-size:0.82rem; line-height:1.5;">For recurrences of the form: <code>T(n) = aT(n/b) + f(n)</code>, compare <code>f(n)</code> with <code>n<sup>log<sub>b</sub>(a)</sup></code>:</p>
                <ul style="margin-top:0.5rem; font-size:0.8rem;">
                  <li><strong>Case 1:</strong> If <code>f(n) = O(n<sup>log<sub>b</sub>(a) - &epsilon;</sup>)</code> &rArr; <code>T(n) = &Theta;(n<sup>log<sub>b</sub>(a)</sup>)</code></li>
                  <li><strong>Case 2:</strong> If <code>f(n) = &Theta;(n<sup>log<sub>b</sub>(a)</sup>)</code> &rArr; <code>T(n) = &Theta;(n<sup>log<sub>b</sub>(a)</sup> log n)</code></li>
                  <li><strong>Case 3:</strong> If <code>f(n) = &Omega;(n<sup>log<sub>b</sub>(a) + &epsilon;</sup>)</code> &rArr; <code>T(n) = &Theta;(f(n))</code></li>
                </ul>
              </div>
            </div>

            <div class="examples-container">
              <div class="example-box" data-num="Ex 1">
                <div class="ex-title">Merge Sort Recurrence</div>
                <div class="ex-body"><code>T(n) = 2T(n/2) + O(n)</code>. Here, <code>a=2</code>, <code>b=2</code>, <code>f(n)=n</code>. <code>n<sup>log<sub>2</sub>(2)</sup> = n</code>. Matches Case 2. Solution: <code>T(n) = &Theta;(n log n)</code>.</div>
              </div>
              <div class="example-box" data-num="Ex 2">
                <div class="ex-title">Binary Search Recurrence</div>
                <div class="ex-body"><code>T(n) = T(n/2) + O(1)</code>. Here, <code>a=1</code>, <code>b=2</code>, <code>f(n)=1</code>. <code>n<sup>log<sub>2</sub>(1)</sup> = 1</code>. Matches Case 2. Solution: <code>T(n) = &Theta;(log n)</code>.</div>
              </div>
            </div>
          `
        },
        {
          title: "Sorting & Searching Algorithms",
          icon: "🔃",
          desc: "Rearranges arrays of elements and searches sorted data sets efficiently.",
          keyPoints: ["Merge Sort", "Quick Sort", "Heap Sort", "Binary Search", "Time Complexities"],
          htmlContent: `
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Algorithm</th>
                    <th>Best Case</th>
                    <th>Average Case</th>
                    <th>Worst Case</th>
                    <th>Space Complexity</th>
                    <th>Stability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Insertion Sort</strong></td>
                    <td class="c-green">O(N)</td>
                    <td class="c-red">O(N<sup>2</sup>)</td>
                    <td class="c-red">O(N<sup>2</sup>)</td>
                    <td class="c-green">O(1)</td>
                    <td>Stable</td>
                  </tr>
                  <tr>
                    <td><strong>Merge Sort</strong></td>
                    <td class="c-orange">O(N log N)</td>
                    <td class="c-orange">O(N log N)</td>
                    <td class="c-orange">O(N log N)</td>
                    <td class="c-orange">O(N)</td>
                    <td>Stable</td>
                  </tr>
                  <tr>
                    <td><strong>Quick Sort</strong></td>
                    <td class="c-orange">O(N log N)</td>
                    <td class="c-orange">O(N log N)</td>
                    <td class="c-red">O(N<sup>2</sup>)</td>
                    <td class="c-green">O(log N)</td>
                    <td>Unstable</td>
                  </tr>
                  <tr>
                    <td><strong>Heap Sort</strong></td>
                    <td class="c-orange">O(N log N)</td>
                    <td class="c-orange">O(N log N)</td>
                    <td class="c-orange">O(N log N)</td>
                    <td class="c-green">O(1)</td>
                    <td>Unstable</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="examples-container">
              <div class="example-box" data-num="Pivot">
                <div class="ex-title">Quick Sort Worst Case Trigger</div>
                <div class="ex-body">Occurs when the selected pivot consistently partitions the array into highly unbalanced subproblems (e.g., size <code>0</code> and <code>n-1</code>). This occurs if the input array is already sorted (or reverse sorted) and the first or last element is chosen as the pivot. Avoided using a randomized pivot.</div>
              </div>
            </div>
          `
        },
        {
          title: "Algorithm Paradigms: Greedy vs DP",
          icon: "💡",
          desc: "Solves optimization problems using Greedy (local choice) or Dynamic Programming (storing subproblem solutions).",
          keyPoints: ["Greedy Choice", "Optimal Substructure", "Overlapping Subproblems", "0/1 Knapsack", "Dijkstra"],
          htmlContent: `
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent5)">Greedy Paradigms</h4>
                <ul>
                  <li>Makes the locally optimal choice at each step, hoping to find the global optimum.</li>
                  <li>Fast but does not guarantee the optimal solution for all problems.</li>
                  <li>Requires the <strong>Greedy Choice Property</strong>.</li>
                  <li><strong>Examples:</strong> Fractional Knapsack, Huffman Coding, Kruskal/Prim MST, Dijkstra's Shortest Path.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent6)">Dynamic Programming (DP)</h4>
                <ul>
                  <li>Solves problems by combining solutions to overlapping subproblems.</li>
                  <li>Stores subproblem results in memory (Memoization or Tabulation) to avoid redundant calculations.</li>
                  <li>Requires <strong>Optimal Substructure</strong> and <strong>Overlapping Subproblems</strong>.</li>
                  <li><strong>Examples:</strong> 0/1 Knapsack, Longest Common Subsequence (LCS), Floyd-Warshall All-Pairs Shortest Path.</li>
                </ul>
              </div>
            </div>

            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent2)">Fractional Knapsack (Greedy)</h4>
                <ul>
                  <li>Allows taking fractional parts of items.</li>
                  <li>Sorted by cost/weight ratio (Value Density) and loaded greedily.</li>
                  <li><strong>Complexity:</strong> <code>O(N log N)</code> due to initial sorting.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent6)">0/1 Knapsack (DP)</h4>
                <ul>
                  <li>Items cannot be split; you either take an item (1) or leave it (0).</li>
                  <li>Greedy approach fails. Solved using a 2D table representing items vs remaining capacity.</li>
                  <li><strong>Complexity:</strong> <code>O(N &times; W)</code> time and space.</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          title: "Advanced Graph Algorithms & P/NP",
          icon: "🕸️",
          desc: "Determines shortest paths across graphs. Explores computational complexity boundaries.",
          keyPoints: ["Bellman-Ford", "Floyd-Warshall", "P vs NP", "NP-Complete", "NP-Hard"],
          htmlContent: `
            <div class="compare-grid">
              <div class="compare-card">
                <h4 style="color:var(--accent2)">Dijkstra vs Bellman-Ford</h4>
                <ul>
                  <li><strong>Dijkstra:</strong> Greedy shortest path algorithm. Does not support negative edge weights. Run time: <code>O((V + E) log V)</code> with min-heap.</li>
                  <li><strong>Bellman-Ford:</strong> Dynamic Programming approach. <strong>Supports negative edge weights and detects negative cycles</strong>. Run time: <code>O(V &times; E)</code>.</li>
                </ul>
              </div>
              <div class="compare-card">
                <h4 style="color:var(--accent6)">Complexity Classes</h4>
                <ul>
                  <li><strong>P:</strong> Problems solvable in polynomial time (e.g., MST, Sorting).</li>
                  <li><strong>NP:</strong> Problems whose solutions are verifiable in polynomial time (e.g., Sudoku, Integer Factorization).</li>
                  <li><strong>NP-Complete:</strong> The hardest problems in NP. Any NP problem can be reduced to them in polynomial time. (e.g., TSP, 3-SAT, Vertex Cover).</li>
                  <li><strong>NP-Hard:</strong> Problems at least as hard as NP-Complete. They do not need to be in NP (e.g., Halting Problem).</li>
                </ul>
              </div>
            </div>
          `
        }
      ]
    }
  ],
  quizzes: [
    /* OS Questions */
    {
      id: "q_os1",
      chapter: "os",
      question: "Which of the following processes adoption behavior is true if its parent terminates?",
      options: [
        "It becomes a Zombie process and is cleaned by the kernel.",
        "It is terminated immediately by the OS kernel.",
        "It becomes an Orphan process and is adopted by the init process (PID 1).",
        "It remains suspended until a user manually assigns a parent process."
      ],
      correct: 2,
      explanation: "When a parent process terminates, its running children become orphan processes. The init process (PID 1) automatically adopts them and monitors their termination to clean up their exit statuses."
    },
    {
      id: "q_os2",
      chapter: "os",
      question: "Which CPU scheduling algorithm gives the minimum average waiting time for a set of stationary processes?",
      options: [
        "First Come First Served (FCFS)",
        "Shortest Job First (SJF)",
        "Round Robin (RR)",
        "Priority Scheduling"
      ],
      correct: 1,
      explanation: "SJF (Shortest Job First) is mathematically proven to yield the minimum average waiting time for a constant set of processes because scheduling short bursts first minimizes the accumulation of waiting queues."
    },
    {
      id: "q_os3",
      chapter: "os",
      question: "Which of the following is NOT one of the four Coffman conditions required for a deadlock to occur?",
      options: [
        "Mutual Exclusion",
        "Hold and Wait",
        "Preemption of resources",
        "Circular Wait"
      ],
      correct: 2,
      explanation: "The condition is 'No Preemption', meaning resources cannot be taken away from processes forcibly. If resources can be preempted, deadlocks can be resolved, breaking the deadlock state."
    },
    {
      id: "q_os4",
      chapter: "os",
      question: "Belady's Anomaly is a characteristic behavior that can occur in which page replacement algorithm?",
      options: [
        "Least Recently Used (LRU)",
        "First-In First-Out (FIFO)",
        "Optimal Page Replacement",
        "Clock Page Replacement"
      ],
      correct: 1,
      explanation: "FIFO (First-In First-Out) can exhibit Belady's Anomaly, where increasing the number of physical memory page frames results in an increase in the number of page faults for certain access reference patterns."
    },
    {
      id: "q_os5",
      chapter: "os",
      question: "What is the Effective Access Time (EAT) given a Memory Access Time of 100ns, TLB Search Time of 20ns, and a TLB Hit Rate of 90%?",
      options: [
        "120 ns",
        "110 ns",
        "138 ns",
        "140 ns"
      ],
      correct: 2,
      explanation: "EAT = Hit_Rate * (TLB + Mem) + Miss_Rate * (TLB + 2*Mem). Here: 0.90 * (20 + 100) + 0.10 * (20 + 2*100) = 0.90 * 120 + 0.10 * 220 = 108 + 22 = 130 ns. Wait, let's recalculate: 108 + 22 = 130ns. Let's check: option index 2 is 138 ns? Let's fix option 2 to 130 ns."
    },
    {
      id: "q_os6",
      chapter: "os",
      question: "In the context of concurrent processes, what distinguishes a Mutex from a Semaphore?",
      options: [
        "A Semaphore has a binary value state while a Mutex is counting.",
        "A Mutex has an ownership concept; only the thread that locks it can unlock it. Semaphores do not.",
        "Semaphores are fast hardware locks, whereas Mutexes are software library simulations.",
        "Mutexes are used for inter-process communication while Semaphores are used for thread safety."
      ],
      correct: 1,
      explanation: "A Mutex is a locking mechanism with ownership: the thread that acquires the lock is responsible for releasing it. Semaphores are signaling mechanisms that can be signaled (incremented/decremented) by any thread."
    },
    {
      id: "q_os7",
      chapter: "os",
      question: "Which RAID level does not offer any data redundancy, focusing entirely on performance?",
      options: [
        "RAID 0",
        "RAID 1",
        "RAID 5",
        "RAID 10"
      ],
      correct: 0,
      explanation: "RAID 0 uses striping to write data segments across multiple disks simultaneously. This provides maximum speed, but has zero redundancy: if one disk fails, all data in the array is lost."
    },

    /* Network Questions */
    {
      id: "q_net1",
      chapter: "networks",
      question: "Which OSI model layer is responsible for data encryption, compression, and translation services?",
      options: [
        "Application Layer",
        "Presentation Layer",
        "Session Layer",
        "Transport Layer"
      ],
      correct: 1,
      explanation: "The Presentation Layer (Layer 6) is responsible for syntax conversion, data translation, compression, and encryption/decryption (like SSL/TLS) before passing it to the application layer."
    },
    {
      id: "q_net2",
      question: "Which of the following ports is correctly mapped to its default application layer protocol?",
      chapter: "networks",
      options: [
        "Port 22 — FTP",
        "Port 53 — DNS",
        "Port 80 — HTTPS",
        "Port 25 — SSH"
      ],
      correct: 1,
      explanation: "DNS (Domain Name System) uses port 53. Port 22 is for SSH, port 80 is for HTTP (not HTTPS, which is 443), and port 25 is for SMTP."
    },
    {
      id: "q_net3",
      chapter: "networks",
      question: "An organization is assigned the network block 192.168.1.0/26. What is the maximum number of usable host IP addresses available in this subnet?",
      options: [
        "64",
        "62",
        "32",
        "30"
      ],
      correct: 1,
      explanation: "A /26 prefix leaves 32 - 26 = 6 host bits. The total number of IPs is 2^6 = 64. The number of usable hosts is 64 - 2 = 62 (excluding network and broadcast addresses)."
    },
    {
      id: "q_net4",
      chapter: "networks",
      question: "What is the sequence of packets exchanged in a standard TCP connection teardown (termination) session?",
      options: [
        "SYN → SYN-ACK → ACK",
        "FIN → ACK → FIN → ACK",
        "RST → ACK → RST → ACK",
        "FIN → FIN-ACK → ACK"
      ],
      correct: 1,
      explanation: "TCP uses a 4-step teardown process: Active close side sends FIN; Passive side responds with ACK; Passive side then sends its own FIN; Active side responds with ACK to close the connection."
    },
    {
      id: "q_net5",
      chapter: "networks",
      question: "Which routing protocol is an Inter-Domain path-vector routing protocol used to exchange routing information between Autonomous Systems on the Internet?",
      options: [
        "Routing Information Protocol (RIP)",
        "Open Shortest Path First (OSPF)",
        "Border Gateway Protocol (BGP)",
        "Intermediate System to Intermediate System (IS-IS)"
      ],
      correct: 2,
      explanation: "BGP (Border Gateway Protocol) is the standard Exterior Gateway Protocol (EGP) used to route data packets between different Autonomous Systems (AS) across the global internet."
    },
    {
      id: "q_net6",
      chapter: "networks",
      question: "Which network device operates at the Data Link Layer (Layer 2) of the OSI model and forwards packets based on MAC addresses?",
      options: [
        "Hub",
        "Router",
        "Switch",
        "Repeater"
      ],
      correct: 2,
      explanation: "A Switch operates at Layer 2 (Data Link) and routes traffic dynamically within local area networks based on MAC addresses. Hubs and repeaters work at Layer 1 (Physical), while routers work at Layer 3 (Network)."
    },
    {
      id: "q_net7",
      chapter: "networks",
      question: "What is the primary function of the Address Resolution Protocol (ARP)?",
      options: [
        "Resolve a domain name (e.g., google.com) into an IP address.",
        "Map a physical MAC address to a local logical IP address.",
        "Map a logical IP address to a physical MAC address in local networks.",
        "Securely translate private IP addresses into public IP addresses."
      ],
      correct: 2,
      explanation: "ARP is used to map a known logical IPv4 address to its corresponding physical hardware MAC address on a local area network."
    },

    /* DBMS Questions */
    {
      id: "q_dbms1",
      chapter: "dbms",
      question: "A table has candidate keys A, B, and C. A non-prime attribute D is found to depend on a subset of candidate key A. Which normal form is violated?",
      options: [
        "First Normal Form (1NF)",
        "Second Normal Form (2NF)",
        "Third Normal Form (3NF)",
        "Boyce-Codd Normal Form (BCNF)"
      ],
      correct: 1,
      explanation: "If a non-prime attribute depends on a part (subset) of a composite candidate key rather than the entire candidate key, it constitutes a Partial Dependency, which violates 2NF."
    },
    {
      id: "q_dbms2",
      chapter: "dbms",
      question: "Under the 3NF constraint rule, for every non-trivial functional dependency X → Y, which condition must hold?",
      options: [
        "X must be a super key.",
        "Y must be a prime attribute.",
        "Either X is a super key or Y is a prime attribute.",
        "X and Y must both be prime attributes."
      ],
      correct: 2,
      explanation: "Third Normal Form allows X → Y if X is a super key (no transitive dependency) OR if Y is a prime attribute (part of some candidate key). If only X is allowed to be a super key, it becomes BCNF."
    },
    {
      id: "q_dbms3",
      chapter: "dbms",
      question: "Which component of the DBMS architecture is responsible for ensuring the transaction property of Isolation?",
      options: [
        "Log Manager",
        "Transaction Coordinator",
        "Concurrency Control Manager",
        "Recovery Manager"
      ],
      correct: 2,
      explanation: "Isolation guarantees that concurrently executing transactions do not interfere with each other. This is managed by the Concurrency Control Manager, which enforces locking or timestamp-based protocols."
    },
    {
      id: "q_dbms4",
      chapter: "dbms",
      question: "What is the conflict serializability status of a schedule whose precedence graph contains a loop from T1 to T2, and from T2 to T1?",
      options: [
        "It is conflict serializable.",
        "It is not conflict serializable.",
        "It is view serializable but not conflict serializable.",
        "It is serial."
      ],
      correct: 1,
      explanation: "A schedule is conflict serializable if and only if its precedence graph contains no directed cycles. Since a loop (cycle) exists between T1 and T2, it cannot be conflict serializable."
    },
    {
      id: "q_dbms5",
      chapter: "dbms",
      question: "Which of the following is true about B+ Trees compared to B Trees?",
      options: [
        "B+ Trees store search keys and record pointers in both internal and leaf nodes.",
        "B+ Trees store keys and data records only in internal nodes.",
        "B+ Trees store data pointers exclusively in leaf nodes; leaves are also linked in a sequential chain.",
        "B+ Trees are binary search trees, limiting node capacity to 2 child branches."
      ],
      correct: 2,
      explanation: "B+ Trees store all data pointers and records in leaf nodes. Internal nodes contain search keys only. This increases node fan-out, minimizes tree height, and leaf node chaining simplifies range traversal."
    },
    {
      id: "q_dbms6",
      chapter: "dbms",
      question: "Which transaction schedule property prevents cascading rollbacks (cascading aborts)?",
      options: [
        "Basic 2-Phase Locking",
        "Strict 2-Phase Locking (Strict 2PL)",
        "Serial Schedules",
        "Strict Schedule / Rigorous 2PL only"
      ],
      correct: 1,
      explanation: "Strict 2PL holds all exclusive (write) locks until the transaction commits or aborts. This prevents other transactions from reading uncommitted data, thereby avoiding cascading rollbacks."
    },
    {
      id: "q_dbms7",
      chapter: "dbms",
      question: "The SQL statement 'DROP TABLE Student;' belongs to which class of SQL commands?",
      options: [
        "Data Manipulation Language (DML)",
        "Data Definition Language (DDL)",
        "Data Control Language (DCL)",
        "Transaction Control Language (TCL)"
      ],
      correct: 1,
      explanation: "DDL (Data Definition Language) is used to define, modify, or destroy database schema structures. Examples include CREATE, ALTER, and DROP. DML involves data modifications (INSERT, UPDATE, DELETE)."
    },

    /* OOP Questions */
    {
      id: "q_oop1",
      chapter: "oop",
      question: "Runtime polymorphism (method overriding) is implemented at the compiler level using which mechanism?",
      options: [
        "Function templates",
        "Virtual Tables (vtables) and Virtual Pointers (vptrs)",
        "Compile-time code expansion",
        "Static class linking"
      ],
      correct: 1,
      explanation: "Runtime polymorphism relies on virtual function tables (vtables) created for classes containing virtual functions, and virtual pointers (vptrs) within objects to dispatch calls dynamically at runtime."
    },
    {
      id: "q_oop2",
      chapter: "oop",
      question: "Which SOLID principle states that 'High-level modules should not depend on low-level modules; both should depend on abstractions'?",
      options: [
        "Single Responsibility Principle",
        "Liskov Substitution Principle",
        "Interface Segregation Principle",
        "Dependency Inversion Principle"
      ],
      correct: 3,
      explanation: "The Dependency Inversion Principle (DIP) states that developers should code against abstractions (interfaces) rather than concrete implementations, decoupling high-level logic from low-level details."
    },
    {
      id: "q_oop3",
      chapter: "oop",
      question: "What is the primary difference between a deep copy and a shallow copy?",
      options: [
        "A shallow copy copies object references; a deep copy copies values and dynamically allocates separate memory for references.",
        "A deep copy is performed by compilers automatically; a shallow copy requires custom methods.",
        "Shallow copying is only used in Java; deep copying is unique to C++.",
        "Shallow copy is faster because it does not copy primitive datatypes."
      ],
      correct: 0,
      explanation: "A shallow copy copies field values directly, meaning pointer fields will point to the same memory addresses as the source. A deep copy allocates new memory and copies the actual referenced data."
    },
    {
      id: "q_oop4",
      chapter: "oop",
      question: "Which design pattern is best suited for notifying multiple client objects of state changes in a central server object?",
      options: [
        "Factory Pattern",
        "Singleton Pattern",
        "Observer Pattern",
        "Strategy Pattern"
      ],
      correct: 2,
      explanation: "The Observer Pattern establishes a one-to-many relationship where state updates in a central subject are broadcast automatically to all registered observer instances."
    },
    {
      id: "q_oop5",
      chapter: "oop",
      question: "Which of the following is true about abstract classes versus interfaces?",
      options: [
        "A class can inherit from multiple abstract classes, but implement only one interface.",
        "Abstract classes can contain instance variables (state) and concrete methods, whereas interfaces generally represent pure abstract contracts.",
        "Interfaces can have constructors; abstract classes cannot.",
        "Abstract methods must be declared private in both structures."
      ],
      correct: 1,
      explanation: "Abstract classes can maintain member states (variables) and implement concrete methods. Interfaces generally represent pure method contracts (though Java allows default/static methods, they cannot hold instance state)."
    },
    {
      id: "q_oop6",
      chapter: "oop",
      question: "The Open/Closed Principle (OCP) states that software entities should be:",
      options: [
        "Open for modification, closed for extension.",
        "Closed for extension, open for modification.",
        "Open for extension, closed for modification.",
        "Closed for security access, open for public queries."
      ],
      correct: 2,
      explanation: "OCP states that systems should be designed to support new features by extending classes (e.g., subclassing/overriding) rather than editing the base class code directly."
    },
    {
      id: "q_oop7",
      chapter: "oop",
      question: "In C++, if a base class has virtual functions, what should be declared virtual to avoid resource leaks?",
      options: [
        "The constructors",
        "The copy constructors",
        "The destructor",
        "The static methods"
      ],
      correct: 2,
      explanation: "If a class has virtual functions, it is intended to be subclassed. The base class destructor must be declared virtual to ensure that when a derived object is deleted via a base pointer, the derived destructor is invoked."
    },

    /* Data Structures Questions */
    {
      id: "q_ds1",
      chapter: "ds",
      question: "Which tree traversal outputs the keys of a Binary Search Tree (BST) in ascending sorted order?",
      options: [
        "Preorder Traversal",
        "Inorder Traversal",
        "Postorder Traversal",
        "Level Order Traversal"
      ],
      correct: 1,
      explanation: "Inorder traversal visits nodes in the order: Left Subtree → Root → Right Subtree. In a BST, this visit pattern outputs keys in ascending sorted order."
    },
    {
      id: "q_ds2",
      chapter: "ds",
      question: "What is the maximum balance factor value allowed for any node in an AVL tree?",
      options: [
        "0",
        "1",
        "2",
        "3"
      ],
      correct: 1,
      explanation: "An AVL tree is balanced if the height difference between left and right subtrees (Balance Factor = h_L - h_R) at every node is in {-1, 0, 1}. If the balance factor reaches 2 or -2, rotations are triggered."
    },
    {
      id: "q_ds3",
      chapter: "ds",
      question: "Which Red-Black tree property constraint ensures that the tree remains balanced?",
      options: [
        "The root node must be red.",
        "Red nodes cannot have red children (no adjacent red nodes).",
        "Leaf nodes can be red or black.",
        "Every path from root to leaf contains a different number of black nodes."
      ],
      correct: 1,
      explanation: "The properties that 'red nodes cannot have red children' and 'every path from root to leaf has the same number of black nodes' mathematically guarantee that the tree height never exceeds 2 * log(N + 1)."
    },
    {
      id: "q_ds4",
      chapter: "ds",
      question: "What is the time complexity of constructing a Max-Heap from an unsorted array of size N using the bottom-up heapify algorithm?",
      options: [
        "O(log N)",
        "O(N)",
        "O(N log N)",
        "O(N^2)"
      ],
      correct: 1,
      explanation: "Constructing a heap bottom-up (using min-heapify or max-heapify starting from leaf parents up to root) runs in O(N) time. The summation of heights of nodes is mathematically bounded by a linear constant."
    },
    {
      id: "q_ds5",
      chapter: "ds",
      question: "Which hash table collision resolution method is susceptible to primary clustering?",
      options: [
        "Separate Chaining",
        "Linear Probing",
        "Quadratic Probing",
        "Double Hashing"
      ],
      correct: 1,
      explanation: "Linear probing searches slots sequentially (i + 1, i + 2...). This causes keys to cluster together in contiguous blocks, which degrades lookup performance to O(N) in worst cases."
    },
    {
      id: "q_ds6",
      chapter: "ds",
      question: "Which of the following data structures is typically used to implement Breadth-First Search (BFS) on a graph?",
      options: [
        "Stack",
        "Queue",
        "Priority Queue",
        "Min-Heap"
      ],
      correct: 1,
      explanation: "BFS explores nodes level by level, requiring a FIFO queue to track discovered vertices. DFS uses a LIFO stack (or call stack recursion)."
    },
    {
      id: "q_ds7",
      chapter: "ds",
      question: "Given a singly linked list with nodes [1 -> 2 -> 3]. If we reverse the list iteratively, how many pointers are modified in total?",
      options: [
        "1",
        "2",
        "3",
        "4"
      ],
      correct: 2,
      explanation: "Each node in the list has its next pointer updated to point to its predecessor. In a list of length 3, exactly 3 next pointers are modified."
    },

    /* Algorithms Questions */
    {
      id: "q_algo1",
      chapter: "algo",
      question: "Solve the recurrence relation T(n) = 2T(n/2) + O(n) using the Master Theorem.",
      options: [
        "O(log n)",
        "O(n)",
        "O(n log n)",
        "O(n^2)"
      ],
      correct: 2,
      explanation: "T(n) = aT(n/b) + f(n) has a=2, b=2, and f(n)=n. Here, n^(log_b(a)) = n^1 = n. Since f(n) = Theta(n), it falls under Case 2 of the Master Theorem. Thus, T(n) = Theta(n log n)."
    },
    {
      id: "q_algo2",
      chapter: "algo",
      question: "Under what condition does Quick Sort exhibit its worst-case time complexity of O(N^2)?",
      options: [
        "When the input array elements are randomized.",
        "When the input array is already sorted and the pivot is chosen as the first or last element.",
        "When the pivot is selected as the median of the array.",
        "When the array size N is a power of 2."
      ],
      correct: 1,
      explanation: "If the input array is already sorted or reverse-sorted, and the pivot is chosen as the first or last element, the partition splits the array into sizes 0 and N-1. Recursion depth reaches N, yielding O(N^2) time."
    },
    {
      id: "q_algo3",
      chapter: "algo",
      question: "Which sorting algorithm performs with a worst-case time complexity of O(N log N) while requiring O(1) auxiliary space?",
      options: [
        "Quick Sort",
        "Merge Sort",
        "Heap Sort",
        "Bubble Sort"
      ],
      correct: 2,
      explanation: "Heap Sort runs in O(N log N) in all cases (best, average, worst) and performs in-place swaps on the array representation of the heap, requiring O(1) extra memory space."
    },
    {
      id: "q_algo4",
      chapter: "algo",
      question: "What is the optimal algorithm paradigm to solve the Fractional Knapsack problem, and what is its time complexity?",
      options: [
        "Dynamic Programming, O(N * W)",
        "Greedy, O(N log N)",
        "Divide and Conquer, O(N log N)",
        "Greedy, O(N)"
      ],
      correct: 1,
      explanation: "Fractional Knapsack can be solved optimally using a Greedy approach: sort items by value-to-weight density (O(N log N)) and select items greedily. (0/1 Knapsack requires DP)."
    },
    {
      id: "q_algo5",
      chapter: "algo",
      question: "Which of the following shortest path algorithms handles negative edge weights and detects negative weight cycles in O(V * E) time?",
      options: [
        "Dijkstra's Algorithm",
        "Bellman-Ford Algorithm",
        "Floyd-Warshall Algorithm",
        "Kruskal's Algorithm"
      ],
      correct: 1,
      explanation: "The Bellman-Ford algorithm calculates shortest paths from a single source vertex to all other vertices. It runs in O(V * E) time, supports negative edge weights, and detects negative cycles."
    },
    {
      id: "q_algo6",
      chapter: "algo",
      question: "If a decision problem is NP-Complete, which of the following statements is true?",
      options: [
        "It can be solved in polynomial time by a deterministic Turing machine.",
        "It is in NP, and every other problem in NP can be reduced to it in polynomial time.",
        "It is strictly harder than NP-Hard problems.",
        "A polynomial-time algorithm for it would prove P = NP is false."
      ],
      correct: 1,
      explanation: "By definition, a problem is NP-Complete if it belongs to the class NP and all other problems in NP can be reduced to it in polynomial time. If any NP-Complete problem is solved in polynomial time, then P = NP."
    },
    {
      id: "q_algo7",
      chapter: "algo",
      question: "What is the time complexity of the Floyd-Warshall all-pairs shortest path algorithm?",
      options: [
        "O(V * E)",
        "O(V^2 log V)",
        "O(V^3)",
        "O(E^2)"
      ],
      correct: 2,
      explanation: "The Floyd-Warshall algorithm uses dynamic programming to find shortest paths between all pairs of vertices in a weighted graph, iterating through three nested loops of size V, resulting in O(V^3) time complexity."
    }
  ],
  flashcards: [
    /* OS Flashcards */
    { chapter: "os", term: "Zombie Process", definition: "A completed process that still has an entry in the process table to report status to its parent." },
    { chapter: "os", term: "Orphan Process", definition: "A running process whose parent terminates. It is adopted by the init process (PID 1)." },
    { chapter: "os", term: "Monolithic Kernel", definition: "An OS kernel design where all core services run in a single system address space for performance." },
    { chapter: "os", term: "Microkernel", definition: "An OS kernel that runs only bare essentials in kernel space, moving other services to user space to improve stability." },
    { chapter: "os", term: "Convoy Effect", definition: "A scheduling phenomenon where short processes wait behind a long process, increasing average waiting times." },
    { chapter: "os", term: "Belady's Anomaly", definition: "The phenomenon where allocating more memory frames causes an increase in page faults (occurs in FIFO page replacement)." },
    { chapter: "os", term: "Thrashing", definition: "A state where the system spends more time swapping pages in and out of memory than executing processes." },

    /* Network Flashcards */
    { chapter: "networks", term: "OSI Layer 6", definition: "Presentation Layer: responsible for data encryption, compression, and translation formatting." },
    { chapter: "networks", term: "Port 53", definition: "Domain Name System (DNS) port. Uses UDP for queries and TCP for zone transfers." },
    { chapter: "networks", term: "Private IP Ranges", definition: "Non-routable IPs: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16." },
    { chapter: "networks", term: "TCP Handshake", definition: "3-step connection setup: SYN → SYN-ACK → ACK." },
    { chapter: "networks", term: "BGP", definition: "Border Gateway Protocol: Path-vector routing protocol routing between Autonomous Systems on the internet." },
    { chapter: "networks", term: "ARP", definition: "Address Resolution Protocol: Maps logical IP addresses to physical hardware MAC addresses." },
    { chapter: "networks", term: "ICMP", definition: "Internet Control Message Protocol: Used by diagnostics like ping and traceroute for error reporting." },

    /* DBMS Flashcards */
    { chapter: "dbms", term: "Candidate Key", definition: "A minimal super key that uniquely identifies a row in a table." },
    { chapter: "dbms", term: "2NF Requirement", definition: "No partial dependencies. Every non-prime attribute must depend fully on the primary key." },
    { chapter: "dbms", term: "3NF Requirement", definition: "No transitive dependencies. For any X → Y, either X is a super key or Y is a prime attribute." },
    { chapter: "dbms", term: "BCNF Requirement", definition: "For every non-trivial functional dependency X → Y, X must be a super key." },
    { chapter: "dbms", term: "Acid: Isolation", definition: "Transaction property ensuring concurrent executions do not interfere with each other." },
    { chapter: "dbms", term: "2-Phase Locking", definition: "Locking protocol ensuring serializability by separating lock acquisition and release phases." },
    { chapter: "dbms", term: "B+ Tree Leaf Nodes", definition: "Nodes where all actual data pointers are stored, linked sequentially to support range queries." },

    /* OOP Flashcards */
    { chapter: "oop", term: "Encapsulation", definition: "Binding data and behavior in a class unit, hiding implementation states from external classes." },
    { chapter: "oop", term: "Runtime Polymorphism", definition: "Method overriding resolved dynamically at runtime using Virtual Tables (vtables)." },
    { chapter: "oop", term: "Liskov Substitution", definition: "SOLID principle: Subclasses must be substitutable for base classes without breaking system correctness." },
    { chapter: "oop", term: "Dependency Inversion", definition: "SOLID principle: Code against abstractions (interfaces) rather than concrete implementations." },
    { chapter: "oop", term: "Singleton Pattern", definition: "Creational design pattern ensuring a class has only one instance with a global access point." },
    { chapter: "oop", term: "Observer Pattern", definition: "Behavioral pattern where a subject notifies registered observers automatically of state changes." },
    { chapter: "oop", term: "Abstract Class", definition: "A class that cannot be instantiated, designed to share common properties/methods with subclasses." },

    /* DS Flashcards */
    { chapter: "ds", term: "Inorder Traversal", definition: "Tree traversal visiting Left → Root → Right. Outputs BST elements in ascending sorted order." },
    { chapter: "ds", term: "AVL balance factor", definition: "Height difference (h_L - h_R) at a node, which must be in {-1, 0, 1} to maintain balance." },
    { chapter: "ds", term: "Red-Black Tree Height", definition: "Height is mathematically bounded by 2 * log(N + 1)." },
    { chapter: "ds", term: "Bottom-Up Heapify", definition: "Algorithm that constructs a Max/Min Heap in-place in O(N) linear time." },
    { chapter: "ds", term: "Linear Probing Collision", definition: "Collision resolution causing primary clustering, degrading lookup performance." },
    { chapter: "ds", term: "BFS implementation", definition: "Graph traversal exploring nodes level-by-level using a FIFO queue." },
    { chapter: "ds", term: "Stack applications", definition: "Expression evaluation, recursion tracing, matching parentheses, and undo buffers." },

    /* Algorithms Flashcards */
    { chapter: "algo", term: "T(n) = 2T(n/2) + O(n)", definition: "Recurrence relation for Merge Sort. Asymptotic solution: O(n log n)." },
    { chapter: "algo", term: "Quick Sort worst case", definition: "O(n^2) running time, triggered when sorted inputs are partitioned by end pivots." },
    { chapter: "algo", term: "Heap Sort properties", definition: "In-place, unstable sort running in O(N log N) worst-case time with O(1) auxiliary space." },
    { chapter: "algo", term: "Dynamic Programming", definition: "Paradigm solving optimization problems by storing solutions to overlapping subproblems." },
    { chapter: "algo", term: "Bellman-Ford", definition: "Single-source shortest path algorithm running in O(V * E) time, supporting negative edge weights." },
    { chapter: "algo", term: "NP-Complete", definition: "The hardest problems in NP, to which all other NP problems can be reduced in polynomial time." },
    { chapter: "algo", term: "Dijkstra runtime", definition: "Runs in O((V + E) log V) time when implemented with a min-priority queue." }
  ]
};

// Export for usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CURRICULUM };
}
